$(function(){
    function has_localStorage(){
        return ('localStorage' in window) && window['localStorage'] !== null;
    }
    
    if (has_localStorage()){
        var ls=localStorage, saved_forms;
        saved_forms=ls.getItem('forms');
        if(saved_forms==null)ls.setItem('forms','{}');
        getsaves();
    }
    
    var inum=0, names=[], types=[], texts=[], ids=[], vmins=[], vmaxs=[], vregs=[], fcode='';
    
    function log(msg){
        if(typeof console!=='undefined')console.log(msg);else alert(msg);
    }

    function getsaves(){
        var saved_num=0;
        var s=$('#saved');
        s.html('<h2>Your Saved Forms</h2>');
        $.each($.parseJSON(ls.getItem('forms')),function(i,v){
            s.append('<div id="saved_group_'+saved_num+'"><a href="javascript:void(0)" class="savedf" id="saved_'+saved_num+'">'+i+'</a><img src="delete.png" class="del_code" id="del_'+saved_num+'" /></div>');
            $('#del_'+saved_num).data({'sid':saved_num,'fid':i});
            saved_num++;
        });
    }
    
    function getsaved(formname){
        var r=undefined;
        $.each($.parseJSON(ls.getItem('forms')),function(i,v){
            if(i==formname){
                r=v;
            }
        });
        return r;
    }
    
    $('.del_code').click(function(){
        var me=$(this);
        msg('Are you sure you want to delete <b>'+me.data('fid')+'</b>?<br /><div class="center"><a href="javascript:void(0)"  class="delete_yes">Yes</a> <a href="javascript:void(0)" class="delete_no">No</a></div>','Deleting Code');
        $('.delete_yes, .delete_no').data({'id':me.data('fid'),'sid':me.data('sid')});
    });
    
    $('.delete_yes').live('click',function(e){
        del($(this).data('id'),$(this).data('sid'));
        e.preventDefault();
    });
    
    $('.delete_no').live('click',function(e){
        $('#close').click();
        e.preventDefault();
    });
    
    function del(saved_id,group_id){
        var old=$.parseJSON(ls.getItem('forms')),_new='{';
        $.each(old,function(i,v){
            if (saved_id!=i){
                _new+='"'+i+'":"'+v+'",';
            }
        });
        _new=_new.substr(0,_new.length-1)+'}';
        ls.setItem('forms',_new);
        $('#saved_group_'+group_id).slideUp(function(){
            $(this).remove();
        });
        $('#close').click();
    }
    
    function msg(_msg,head){
        var c='';
        if(head)c+='<h2>'+head+'</h2>';
        c+='<a href="javascript:void(0)" id="close">X</a><div id="msg">'+_msg+'</div>';
        $('#popup').html(c).center().fadeIn();
    }
    
    $('.savedf').live('click',function(e){
        msg('<textarea rows="10" cols="50" id="saved_code_preview">'+getsaved($(this).html()).replace(/_#n/g,'\n').replace(/\</g,'&lt;')+'</textarea><div id="saved_code_preview_msg"></div>',$(this).html());
        $('#saved_code_preview').data({'fid':$(this).attr('id').substr(6),'formname':$(this).html()});
        e.preventDefault();
        e.stopPropagation();
    });
    
    $('#saved_code_preview').live('keyup',function(){
        var m=$('#saved_code_preview_msg');
        if (m.html()==''){
            m.html('The code has been changed. Do you want to <a href="javascript:void(0)" id="save_again">save</a>?').slideDown();
        }
    });
    
    $('#save_again').live('click',function(){
        var scp=$('#saved_code_preview');
        overwrite(scp.data('formname'),$('#saved_code_preview').val());
        $('#saved_code_preview_msg').slideUp(function(){
            $(this).html('');
        });
    });
    
    function overwrite(formname,newformcode){
        var old=$.parseJSON(ls.getItem('forms')), _new='{';
        $.each(old,function(i,v){
            _new+='"'+i+'":"';
            if (i==formname){
                _new+=newformcode.replace(/\n/g,'_#n').replace(/\"/g,'\'');
            }else{
                _new+=v;
            }
            _new+='",';
        });
        _new=_new.substr(0,_new.length-1)+'}';
        ls.setItem('forms',_new);
    }
    
    jQuery.fn.center=function(){
        this.css({'position':'absolute','top':($(window).height()-this.height())/2+$(window).scrollTop()+"px",'left':($(window).width()-this.width())/2+$(window).scrollLeft()+"px"});
        return this;
    };
    
    $(window).click(function(){
        $('#close').click(); 
    });
    
    $('#popup').live('click',function(e){
        e.stopPropagation();
    });
    
    $('#backto1').click(function(){
        $('#code').fadeOut();
        if(has_localStorage())getsaves();
        $('#i_choose').fadeOut(function(){
            $('#i_select,#saved').fadeIn();
        }); 
    });
    
    $('#i_submit').click(function(e){
        inum=$('#i_num').val();
        if(inum!=''){
            inum=parseInt(inum);
            if(inum>99)inum=99;
            $('#i_select,#saved').fadeOut(function(){
                create();
                $('#i_choose').fadeIn();
            });
        }
        e.preventDefault(); 
    });
    
    $('.info').live('click',function(e){
        var m='',i=$(this);
        if(i.hasClass('iname'))m='Used for PHP validation';
        if(i.hasClass('iid'))m='Used for jQuery validation';
        if(i.hasClass('dis'))m='The code format';
        if(i.hasClass('val'))m='Code validation generation for jQuery or PHP';
        if(i.hasClass('valop'))m='Code validation options';
        if(i.hasClass('mysql'))m='Code creation for MySQL';
        e.stopPropagation();
        msg(m,'Info');
    });
    
    $('#close').live('click',function(){
        $('#popup').fadeOut(); 
    });
    
    function create(){
        var code='<h1>2. Create the Form</h1>';
        for(var i=1;i<inum+1;i++){
            texts[i]='Text',types[i]='text',names[i]=ids[i]=vmins[i]=vmaxs[i]=vregs[i]=null;
            code+='<div class="si"><h2>Input '+i+'</h2><div class="t"><label>Type</label><select id="type_'+i+'" class="type_select"><option>Text</option><option>Password</option><option>Select</option><option>Radio</option><option>Textarea</option><option>Checkbox</option></select></div>';
            code+='<div class="t"><label>Text</label><input type="text" id="text_'+i+'" class="text_select" /></div>';
            code+='<div class="t"><label>Name';
            if(i==1)code+='<img src="q.png" class="info iname" />';
            code+='</label><input type="text" id="name_'+i+'" class="name_select" /></div><div class="t"><label>ID';
            if(i==1)code+='<img src="q.png" class="info iid" />';
            code+='</label><input type="text" id="id_'+i+'" class="id_select" /></div><div id="vdiv_'+i+'"><a href="javascript:void(0)" class="vlink" id="vlink_'+i+'">Validation</a>';
            if(i==1)code+='<img src="q.png" class="info valop" />';
            code+='<div id="vinfo_'+i+'" class="vinfo">';
            code+='<div class="t"><label>Min size</label><input type="text" class="vmin" id="vmin_'+i+'"></div><div class="t"><label>Max size</label><input type="text" class="vmax" id="vmax_'+i+'"></div><div class="t"><label>Regex</label><input type="text" class="vreg" id="vreg_'+i+'"></div>';
            code+='</div></div></div></div>';
        }
        code+='<div class="si"><h2>Form method</h2>Post <input type="radio" name="form_meth" value="post" checked="checked" /> | Get <input type="radio" name="form_meth" value="get" /></div>';
        code+='<div class="si"><h2>Display type<img src="q.png" class="info dis" /></h2>Nothing fancy <input type="radio" name="display" value="none" checked="checked" /> | Table <input type="radio" name="display" value="tables" /> | Div <input type="radio" name="display" value="divs" /><div id="div_class_name"><div class="t"><label>Cname</label><input type="text" id="cname" /></div></div></div>';
        code+='<div class="si"><h2>Validation<img src="q.png" class="info val" /></h2>jQuery <input type="checkbox" id="jval" /> | PHP <input type="checkbox" id="phpval" /></div>';
        code+='<div class="si"><h2>MySQL Query<img src="q.png" class="info mysql"></h2>Insert <input type="radio" name="mysql" value="insert" /> | Update <input type="radio" name="mysql" value="update" /> | Search <input type="radio" name="mysql" value="search" /></div>';
        code+='<input type="submit" value="Get the code!" id="code_create" /><br>Form name: <input type="text" id="sname" placeholder="Form name" /><input type="submit" value="Save form" id="save" />';
        $('#opts').html(code);
        
        code='<h1>Your form</h1>';
        for(i=1;i<inum+1;i++)code+='<span id="ex_text_'+i+'">Text</span> <span id="ex_input_'+i+'"><input type="text" /></span><br>';
        code+='<input type="submit" value="Submit" />';
        $('#rt').html(code);
    }
    
    $('#save').live('click',function(e){
        var ls=localStorage,n=$('#sname').val(),l;
        if(fcode!=''&&n!=''){
            l=ls.getItem('forms');
            l=l.substr(0,l.length-1);
            if(l!='{')l+=',';
            l+='"'+n+'":"'+fcode.replace(/\n/g,'_#n').replace(/\"/g,'\'')+'"}';
            ls.setItem('forms',l);
            msg('Form saved. Please go back to view it','Success');
        }else{
            msg('Please press \'Get code\' and enter a form name first','Error');
        }
        e.stopPropagation();
    });
    
    $('.vlink').live('click',function(){
        $('#vinfo_'+$(this).attr('id').substr(6)).slideToggle();
    });

    $('.type_select').live('click',function(){
        var ne,i=$(this).attr('id').substr(5),n=$(this).val().toLowerCase();
        types[i]=n;
        if(n=='select'||n=='radio'||n=='checkbox')$('#vdiv_'+i).slideUp();else $('#vdiv_'+i).slideDown();
        if(n=='select')ne='<select></select>';else if(n=='textarea')ne='<textarea></textarea>';
        if(ne)$('#ex_input_'+i).html(ne);else $('#ex_input_'+i).html('<input type="'+n+'">');
    });
    
    $('#code_create').live('click',function(e){
        codeCreate();
        e.preventDefault(); 
    });
    
    $('.text_select').live('keyup',function(){
        var i=$(this).attr('id').substr(5),
        newText=$(this).val();
        texts[i]=newText;
        $('#ex_text_'+i).html(newText);
    });
    
    $('.name_select').live('keyup',function(){
        names[$(this).attr('id').substr(5)]=$(this).val();
    });
    
    $('.id_select').live('keyup',function(){
        ids[$(this).attr('id').substr(3)]=$(this).val();
    });
    
    $(':input[name=display]').live('change',function(){
        var e=$('#div_class_name');
        if($(this).val()=='divs'){
            e.slideDown();
        }else{
            e.slideUp();
        }
    });
    
    function codeCreate(){
        var ne,n,dtype=$(':input[name=display]:checked').val(),fm=$(':input[name=form_meth]:checked').val(),mysql=$(':input[name=mysql]:checked').val();
        var code='<form action="" method="'+fm+'">\n',v,vval,vjs='//jQuery validation\n',vphp='//php validation\n',is=[],ist=[],isv=[],isid=[];
        if(dtype=='tables')code+='<table>\n';
        for (var i=1;i<inum+1;i++){
            n=types[i];
            ne=null;
            if(dtype=='tables')code+='    <tr><td>';else if(dtype=='divs')code+='<div class="'+$('#cname').val()+'">';
            code+='<label';
            if(ids[i])code+=' for="'+ids[i]+'"';
            code+='>'+texts[i]+'</label>';
            if(dtype=='tables')code+='</td><td>';
            if(n=='select')code+='<select';else if(n=='textarea')code+='<textarea';else code+='<input type="'+n+'"';
            if(names[i])code+=' name="'+names[i]+'"';
            if(ids[i])code+=' id="'+ids[i]+'"';
            if(n=='select')code+='></select>';else if(n=='textarea')code+='></textarea>';else code+=' />';
            if(dtype=='tables')code+='</td></tr>';else if(dtype=='divs')code+='</div>';else code+='<br />';
            code+='\n';
            var v=[],vval=[],vmin,max,vreg;
            if(n=='text'||n=='password'||n=='textarea'){
                if(vmin=$('#vmin_'+i).val()){v.push('min');vval.push(vmin);ist.push('min');isv.push(vmin);isid.push(i);}
                if(vmax=$('#vmax_'+i).val()){v.push('max');vval.push(vmax);ist.push('max');isv.push(vmax);isid.push(i);}
                if(vreg=$('#vreg_'+i).val()){v.push('reg');vval.push(vreg);ist.push('reg');isv.push(vreg);isid.push(i);}
                if(vmin||vmax||vreg)is.push(i);
            }
            if(v.length!=0){
                vjs+='var _'+ids[i]+"=$('#"+ids[i]+"');\nif (";
                for(var ii=0;ii<v.length;ii++){
                    if(ii>0 && ii<v.length)vjs+=' || ';
                    if(v[ii]=='min'){vjs+='_'+ids[i]+'.val().length<'+vval[ii];}
                    if(v[ii]=='max'){vjs+='_'+ids[i]+'.val().length>'+vval[ii];}
                    if(v[ii]=='reg'){vjs+='!'+vval[ii]+'.test(_'+ids[i]+'.val())';}
                }
                vjs+='){\n    _'+ids[i]+'.css(\'border\',\'1px solid #F00\');\n}else{\n    _'+ids[i]+'.css(\'border\',\'1px solid #000\');\n}\n\n';
            }
        }
        if(is.length){
            for(i=0;i<is.length;i++)vphp+='$'+names[is[i]]+"=$_"+fm.toUpperCase()+"['"+names[is[i]]+"'];\n";
            vphp+='\nif (';
            for(i=0;i<isid.length;i++){
                if(i>0&&i<ist.length)vphp+=' || ';
                if(ist[i]=='min')vphp+='strlen($'+names[isid[i]]+')<'+isv[i];
                if(ist[i]=='max')vphp+='strlen($'+names[isid[i]]+')>'+isv[i];
                if(ist[i]=='reg')vphp+='!preg_match("'+isv[i]+'",$'+names[isid[i]]+')';
            }
            vphp+='){\n    //error\n}else{\n    //no error\n}';
        }
        
        if(dtype=='tables')code+='</table>\n';
        code+='<input type="submit" value="Submit" />\n</form>';
        fcode=code;
        $('#the_code').val(code);
        $('#vjs').val(vjs);
        $('#vphp').val(vphp);
        if(mysql){
            
            if(mysql=='insert'){
                code='//QUERY\nmysql_query("';
                code+='INSERT INTO _table_() VALUES(';
                for(var i=1;i<names.length;i++){
                    if(i!=1)code+=', ';
                    code+='\'".$_'+fm.toUpperCase()+'[\''+names[i]+'\']."\'';
                }
                code+='");';
            }else if(mysql=='search'){
                code='//QUERY\n$q=mysql_query("';
                code+='SELECT * FROM _table_ WHERE ';
                for(var i=1;i<names.length;i++){
                    if(i!=1)code+=' AND ';
                    code+='_col'+i+'_=\'".$_'+fm.toUpperCase()+'[\''+names[i]+'\']."\'';
                }
                code+='");\nwhile($r=mysql_fetch_assoc($q)){\n    \n}';
            }else{
                code='//QUERY\nmysql_query("';
                code+='UPDATE _table_ SET';
                for(var i=1;i<names.length;i++){
                    if(i!=1)code+=',';
                    code+=' _col'+i+'_=\'".$_'+fm.toUpperCase()+'[\''+names[i]+'\']."\'';
                }
                code+=' WHERE _blah_=\'_blank_\'");';
            }
            $('#mysql').val(code).fadeIn();
        }
        if($(':input[id=jval]:checked').val()!='on')$('#vjs').fadeOut();else $('#vjs').fadeIn();
        if($(':input[id=phpval]:checked').val()!='on')$('#vphp').fadeOut();else $('#vphp').fadeIn();
        $('#code').fadeIn();
    }
});