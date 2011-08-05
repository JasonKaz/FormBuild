var AvailInputs=["text","password","radio","checkbox","textarea","select"],
Inputs=[],
Order=[],
Selected=null;

var Attributes=["id","name","disabled","mex_len","size","auto_complete","value","checked","cols","rows","number_min","number_max","number_value","number_step","range_min","range_max","range_step"],
InputAttributes={
    text : ["id","name","disabled","max_len","size","auto_complete","value"],
    password : ["id","name","disabled","max_len","size","auto_complete","value"],
    radio : ["id","name","disabled","checked","value"],
    checkbox : ["id","name","disabled","checked","value"],
    textarea : ["id","name","disabled","cols","rows"],
    select : ["id","name","disabled"],
    search : ["id","name","disabled","auto_complete"],
    tel : ["id","name","disabled","auto_complete"],
    url : ["id","name","disabled","auto_complete"],
    email : ["id","name","disabled","auto_complete"],
    number : ["id","name","number_min","number_max","number_step","number_value"],
    range : ["id","name","range_min","range_max","range_step"],
    color : ["id","name","value"],
    date : ["id","name","extrainfo"],
    time : ["id","name","extrainfo"],
    datetime : ["id","name"],
    month : ["id","name"],
    week : ["id","name"],
    "datetime-local" : ["id","name"]
};

$(function(){
    var $Preview=$('#sortable'),
    $SetLabel=$('#setinput_label'),
    $SetName=$('#setinput_name'),
    $SetID=$('#setinput_id'),
    $SetChecked=$('#setinput_checked'),
    $SetDisabled=$('#setinput_disabled'),
    $SetRows=$('#setinput_rows'),
    $SetCols=$('#setinput_cols'),
    $SetMaxLen=$('#setinput_maxlen'),
    $SetSize=$('#setinput_size'),
    $SetSliderMax=$('#setinput_range_max'),
    $SetSliderStep=$('#setinput_range_step'),
    $SetSliderAnim=$('#setinput_range_anim'),
    $SetSliderMin=$('#setinput_range_min'),
    $SetValue=$('#setinput_value'),
    $SetAutoComplete=$('#setinput_autocomplete'),
    $SetNumberMin=$('#setinput_number_min'),
    $SetNumberMax=$('#setinput_number_max'),
    $SetNumberStep=$('#setinput_number_step'),
    $SetNumberVal=$('#setinput_number_val');
    
    $('#sortable').sortable({
        delay: 200,
        update: function(ev,ui){
            Order=[];
            var ids=$(this).sortable('toArray');

            for(var i=0;i<ids.length;i++)
                Order.push(parseInt(ids[i].substr(10)));
        }
    });
    
    function Input(Type, JQ_Replacement){
        this.InputID=Inputs.length;
        this.UseJQ=JQ_Replacement!=null?true:false;
        
        Order.push(this.InputID);
        
        //Common
        this.Type=Type;
        this.Label="Label";
        this.ID="";
        this.Name="";
        this.Required=false;
        this.AutoComplete=true;
        
        //Text/Password
        this.MaxLen=null;
        this.Size=null;
        
        //Checkbox/Radio
        this.Checked=false;
        this.Value="";
        
        //Textarea
        this.Cols=this.Rows=0;
        
        //Select
        this.Options="";
        
        //Range
        this.Slider=null;
        this.SliderMax=100;
        this.SliderMin=0;
        this.SliderStep=1;
        this.SliderAnim=false;
        
        //Number
        this.NumberMin=0;
        this.NumberMax=100;
        this.NumberStep=1;
        this.NumberVal=0;
        
        Inputs.push(this);
        insert_input(this);
        
        this.gethtml=function(){
            var code='    <div>';
            code+=this.getlabelhtml();
            
            switch (this.Type){
                case "text":
                case "password":
                code+='<input type="'+this.Type+'"';
                code+=this.getnamehtml();
                code+=this.getidhtml();
                code+=this.getvaluehtml();
                code+=this.getmaxlenhtml();
                code+=this.getsizehtml();
                code+=this.getautocompletehtml();
                code+=this.getdisabledhtml();
                break;
                
                case "textarea":
                code+='<textarea';
                code+=this.getnamehtml();
                code+=this.getidhtml();
                code+=this.getdisabledhtml();
                if (this.Cols!=0)code+=' cols="'+this.Cols+'"';
                if (this.Rows!=0)code+=' rows="'+this.Rows+'"';
                code+='></textarea>';
                break;
                
                case "radio":
                case "checkbox":
                code+='<input type="'+this.Type+'"';
                code+=this.getnamehtml();
                code+=this.getidhtml();
                code+=this.getvaluehtml();
                code+=this.getdisabledhtml();
                code+=this.getcheckedhtml();
                break;
                
                case "select":
                code+='<select';
                code+=this.getnamehtml();
                code+=this.getidhtml();
                code+=this.getdisabledhtml();
                code+='></select>';
                break;
                
                default:
                code+='<input type="'+this.Type+'"';
            }
            
            if (this.Type!="textarea" && this.Type!="select")
                code+=' />';
            
            
            code+='</div>\n';
            
            return code;
        };
        
        this.getcheckedhtml=function(){
            return this.Checked==true?' checked="checked"':'';
        };
        
        this.getlabelhtml=function(){
            var code="";
            if (this.Label){
                code+='<label';
                if (this.ID)code+=' for="'+this.ID+'"';
                code+='>'+this.Label+'</label> ';
            }
            
            return code;
        };
        
        this.getnamehtml=function(){
            return this.Name?' name="'+this.Name+'"':'';
        };
        
        this.getidhtml=function(){
            return this.ID?' id="'+this.ID+'"':'';
        };
        
        this.getvaluehtml=function(){
            //return this.Value||''
            return this.Value?' value="'+this.Value+'"':'';
        };
        
        this.getmaxlenhtml=function(){
            return this.MaxLen?' maxlength="'+this.MaxLen+'"':'';
        };
        
        this.getsizehtml=function(){
            return this.Size?' size="'+this.Size+'"':'';
        };
        
        this.getautocompletehtml=function(){
            return this.AutoComplete?' autocomplete="off"':'';
        };
        
        this.getdisabledhtml=function(){
            return this.Disabled?' disabled="true"':'';
        };
        
        this.name=function(Name){
            this.Name=Name;
        };
        
        this.id=function(ID){
            this.ID=ID;
        };
        
        this.label=function(Label){
            this.Label=Label;
            $('#input_label_'+this.InputID).text(Label);
        };
        
        this.checked=function(Checked){
            this.Checked=Checked;
            $('#input_'+this.InputID).attr('checked',Checked);
        };
        
        this.disabled=function(Disabled){
            this.Disabled=Disabled;
            if (this.UseJQ){
                if (this.Type=="range")
                    this.Slider.slider({disabled:Disabled});
            }else{
                $('#input_'+this.InputID).attr('disabled',Disabled);
            }
        };
        
        this.rows=function(Rows){
            $('#input_'+this.InputID).attr('rows',Rows);
            this.Rows=Rows;  
        };
        
        this.cols=function(Cols){
            $('#input_'+this.InputID).attr('cols',Cols);
            this.Cols=Cols;  
        };
        
        this.maxlen=function(Max){
            $('#input_'+this.InputID).attr('maxlength',Max);
            this.MaxLen=Max;
        };
        
        this.size=function(Size){
            $('#input_'+this.InputID).attr('size',Size);
            this.Size=Size; 
        };
        
        this.slidermin=function(Min){
            if (this.UseJQ)
                this.Slider.slider({min:Min});
            else
                $('#input_'+this.InputID).attr('min',Min);
            this.SliderMin=Min;
        };
        
        this.slidermax=function(Max){
            if (this.UseJQ)
                this.Slider.slider({max:Max});
            else
                $('#input_'+this.InputID).attr('max',Max);
            this.SliderMax=Max;  
        };
        
        this.sliderstep=function(Step){
            if (this.UseJQ)
                this.Slider.slider({step:Step});
            else
                $('#input_'+this.InputID).attr('step',Step);
            this.SliderStep=Step;  
        };
        
        this.slideranim=function(Animate){
            this.Slider.slider({animate:Animate});
            this.SliderAnim=Animate;
        };
        
        this.value=function(Value){
            if (this.Type=="color" && this.UseJQ){
                $('#input_'+this.InputID+' div').css('background-color',Value);
                $('#input_'+this.InputID).ColorPickerSetColor(Value);
            }else{
                $('#input_'+this.InputID).attr('value',Value);
            }
            this.Value=Value;
        };
        
        this.autocomplete=function(Auto){
            this.AutoComplete=Auto;
            Auto=Auto?'on':'off';
            $('#input_'+this.InputID).attr('autocomplete',Auto);
        };
        
        this.numbermin=function(Min){
            this.NumberMin=Min;
            $('#input_'+this.InputID).attr('min',Min);
        };
        
        this.numbermax=function(Max){
            this.NumberMax=Max;
            $('#input_'+this.InputID).attr('max',Max);
        };
        
        this.numberstep=function(Step){
            this.NumberStep=Step;
            $('#input_'+this.InputID).attr('step',Step);
        };
        
        this.numberval=function(Val){
            this.NumberVal=Val;
            $('#input_'+this.InputID).attr('value',Val);
        };
    }
    
    //Add input into preview div
    function insert_input(Input){
        var html='<li class="ui-state-default input_preview" data-inputid="'+Input.InputID+'" id="input_div_'+Input.InputID+'"><label id="input_label_'+Input.InputID+'">Label</label> ';
        
        switch (Input.Type){
            case "range":
            if (Input.UseJQ)
                html+='<div id="input_'+Input.InputID+'"></div>';
            else
                html+='<input type="range" id="input_'+Input.InputID+'" />';
            break;
            
            case "number":
            Input.Value=0;
            if (Input.UseJQ)
                html+='<div class="input_number" style="overflow:auto"><input type="text" id="input_'+Input.InputID+'" value="0" style="float:left" /><div style="line-height:10px"><a href="javascript:void(0)" class="plus" style="text-decoration:none">+</a><br /><a href="javascript:void(0)" class="minus" style="text-decoration:none">-</a></div></div>';
            else
                html+='<input type="number" id="input_'+Input.InputID+'" />';
            break;
            
            case "color":
            Input.Value="#FFFFFF";
            if (Input.UseJQ){
                html+='<div id="input_'+Input.InputID+'" class="colpick"><div style="background-color:#FFF;"></div></div>';
            }else{
                html+='<input type="color" id="input_'+Input.InputID+'" />';
            }
            break;
            
            case "date":
            if (Input.UseJQ){
                html+='<input id="input_'+Input.InputID+'" type="text" />';
            }else{
                html+='<input type="date" id="input_'+Input.InputID+'" />';
            }
            break;
            
            case "time":
            if (Input.UseJQ){
                html+='<input id="input_'+Input.InputID+'" type="text" />';
            }else{
                html+='<input id="input_'+Input.InputID+'" type="time" />';
            }
            break;
            
            case "select":
            html+='<select id="input_'+Input.InputID+'"></select>';
            break;
            
            case "textarea":
            html+='<textarea id="input_'+Input.InputID+'"></textarea>';
            break;
            
            default:
            html+='<input type="'+Input.Type+'" id="input_'+Input.InputID+'" />';
        }
        
        html+='<div class="opt"><a href="javascript:void(0)" data-id="'+Input.InputID+'">X</a></div></li>';
        
        $Preview.append(html);
        
        //Adding handlers to jQuery elements
        if (Input.UseJQ){
            switch (Input.Type){
                case "range":
                Input.Slider=$('#input_'+Input.InputID).slider();
                break;
                
                case "number":           
                $('#input_'+Input.InputID).siblings('.up').bind('click',function(){
                    var x=parseInt($('#input_'+Input.InputID).val())+parseInt(Input.NumberStep);
                    if (x<=Input.NumberMax)
                        $('#input_'+Input.InputID).val(x);
                });
                
                $('#input_'+Input.InputID).siblings('.down').bind('click',function(){
                    var x=parseInt($('#input_'+Input.InputID).val())-Input.NumberStep;
                    if (x>=Input.NumberMin)
                        $('#input_'+Input.InputID).val(x);
                });
                break;
                
                case "color":
                $('#input_'+Input.InputID).ColorPicker({
                    color: '#FFFFFF',
                    onBeforeShow:function(colpkr){
                        if ($(colpkr).is(':hidden'))
                            $(colpkr).fadeIn(500);
                        
                        return false;
                    },
                	onHide:function (colpkr) {
                		$(colpkr).fadeOut(500);
                        return false;
                	},
                	onChange:function (hsb, hex) {
                		$('#input_'+Input.InputID).children('div').css('backgroundColor', '#' + hex);
                	}
                });
                break;
                
                case "date":
                $('#input_'+Input.InputID).datepicker();
                break;
                
                case "time":
                $('#input_'+Input.InputID).timepicker();
                break;
            }
        }
    }
    
    function prompt(Title, Message, Buttons){
        $('#dialog').html(Message).dialog({
            title : Title,
            modal : true,
            buttons : Buttons,
            width: '400px'
        });
    }
    
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
    
    //Remove input
    $('.opt a').live('click',function(e){
        e.stopPropagation();
        var id=$(this).data('id');
        
        for(var i=0;i<Inputs.length;i++){
            if (Inputs[i].InputID==id)
                break;
        }
        
        Inputs.remove(i);
        $('#input_div_'+id).remove();
    });
    
    //Adding an input
    $('.add').click(function(){
        var type=$(this).attr('id');
        if (type=='range' || type=="number" || type=="color" || type=="date" || type=="time"){
            prompt('Input Type Selection','This HTML5 input does not work 100% in all browsers. What would you like to do?',{
                'jQuery Replacement' : function(){
                    new Input(type,true);
                    $(this).dialog('close');
                },
                'HTML5' : function(){
                    new Input(type,false);
                    $(this).dialog('close');
                },
                Cancel : function(){
                    $(this).dialog('close');
                }
            });
        }else if(type=="datetime-local" || type=="datetime" || type=="month" || type=="week"){
            prompt('Input Type Selection','This HTML5 input does not work 100% in all browsers and does not have a JavaScript replacement. What would you like to do?',{
                'Insert Anyway' : function(){
                    new Input(type,false);
                    $(this).dialog('close');
                },
                Cancel : function(){
                    $(this).dialog('close');
                }
            });
        }else{
            new Input(type,false);
        } 
    });
    
    //Selecting an input
    $('.input_preview').live('click',function(){
        Selected=$(this).data('inputid');
        var me=Inputs[Selected];
        $('#setinput_label_div').slideDown();
        $('.input_preview').css('border','');
        $('#input_div_'+Selected).css('border','1px dotted #9ED738');
        
        if (me.AutoComplete)$SetAutoComplete.prop('checked',true); else $SetAutoComplete.prop('checked',false);
        if (me.Checked)$SetChecked.prop('checked',true);else $SetChecked.prop('checked',false);
        if (me.Disabled)$SetDisabled.prop('checked',true);else $SetDisabled.prop('checked',false);
        
        $SetSliderMin.val(me.SliderMin);
        $SetSliderMax.val(me.SliderMax);
        $SetSliderStep.val(me.SliderStep);
        $SetLabel.val(me.Label);
        $SetName.val(me.Name);
        $SetID.val(me.ID);
        $SetValue.val(me.Value);
        
        for(var i in Attributes){
            if (InputAttributes[me.Type].indexOf(Attributes[i])!=-1){
                $('#setinput_'+Attributes[i]+'_div').slideDown(); 
            }else{
                 $('#setinput_'+Attributes[i]+'_div').slideUp();
            }
        }
        
        if (me.UseJQ){
            if (me.Type=="range")
                $('#setinput_range_anim_div').slideDown();
                
            if (me.Type=="date")
                $('#setinput_extrainfo_div').html('Other settings found at <a href="http://jqueryui.com/demos/datepicker/" target="_blank">jQueryUI Docs</a>').slideDown();
            
            if (me.Type=="time")
                $('#setinput_extrainfo_div').html('Other settings found at <a href="http://fgelinas.com/code/timepicker/" target="_blank">Timepicker Docs</a>').slideDown();
        }else{
            $('#setinput_range_anim_div').slideUp();
            $('#setinput_extrainfo_div').slideUp();
        }
    }).live('mouseover mouseout',function(ev){
        if (ev.type=="mouseover"){
            $(this).children('.opt').fadeIn();
        }else{
            $(this).children('.opt').fadeOut();
        }
        ev.stopPropagation();
    });
    
    //Code generation handler
    $('#get_code').click(function(){
        var code='<form method="'+$('#form_method').val()+'" action="'+$('#form_action').val()+'">\n',
        Req=[],
        js="",
        me;
        for (var i=0;i<Inputs.length;i++){
            me=Inputs[Order[i]];
            
            if (me.Type=="range"){
                code+='    <div>'+me.getlabelhtml();
                
                if (me.UseJQ){
                    Req.push("jQuery UI Slider (http://jqueryui.com/download)");
                    code+='<div'+me.getidhtml();
                    js+='$("#'+me.ID+'").slider(';
                    var b=me.SliderMin!=0 || me.SliderMax!=100 ||  me.SliderStep!=1 || me.SliderAnim!=false;                    
                    if (b){
                        var t='';
                        js+='{';
                        
                        if(me.SliderMin!=0) t+='\n     min : '+me.SliderMin+',';
                        if(me.SliderMax!=100)t+='\n     max : '+me.SliderMax+',';
                        if(me.SliderStep!=1)t+='\n     step : '+me.SliderStep+',';
                        if(me.SliderValue)t+='\n     value : '+me.Value+',';
                        if(me.SliderAnim!=false)t+='\n    animate : true,';
                        js+=t.substr(0,t.length-1)+'\n';
                    }
                    
                    code+="></div>";
                    js+=');\n\n';
                }else{
                    code+='<input type="range"';
                    code+=me.getidhtml();
                    code+=me.getnamehtml();
                    code+=me.getdisabledhtml();
                    if(me.SliderMin!=0)code+=' min="'+me.SliderMin+'"';
                    if(me.SliderMax!=100)code+=' max="'+me.SliderMax+'"';
                    if(me.SliderStep!=1)code+=' step="'+me.SliderStep+'"';
                    if(me.SliderValue)code+=' value="'+me.SliderValue+'"';
                    code+=' />';
                }
                
                code+='</div>\n';
            }else if (me.Type=="number"){
                code+='    <div>'+me.getlabelhtml();
                
                if (me.UseJQ){
                    //js+='var $'+me.ID+'=$("#'+me.ID+'")';
                    js+='\n\n$(".plus").click(function(){\n    var $input=$("#"+$(this).data("input"));\n    if (parseFloat($input.val())+$input.data("step")<=$input.data("max"))\n        $input.val(parseFloat($input.val()) + $input.data("step"));\n});\n';
                    js+='\n\n$(".minus").click(function(){\n    var $input=$("#"+$(this).data("input"));\n    if (parseFloat($input.val())-$input.data("step")>=$input.data("min"))\n        $input.val(parseFloat($input.val()) - $input.data("step"));\n});\n\n';
                    
                    code+='<div class="input_number" style="overflow:auto"><input type="text"';
                    code+=me.getidhtml()+me.getnamehtml()+me.getdisabledhtml()+me.getautocompletehtml();
                    code+=' value="'+me.NumberVal+'" data-min="'+me.NumberMin+'" data-max="'+me.NumberMax+'" data-step="'+me.NumberStep+'" style="float:left" /><div class="line-height:10px"><a href="javascript:void(0)" class="plus" style="text-decoration:none;font-size:10px"';
                    if (me.ID)code+=' data-input="'+me.ID+'"';
                    code+='>+</a><br /><a href="javascript:void(0)" class="minus" style="text-decoration:none;font-size:10px"';
                    if (me.ID)code+=' data-input="'+me.ID+'"';
                    code+='>-</a></div></div>';
                }else{
                    code+='<input type="number"';
                    code+=me.getidhtml()+me.getnamehtml()+me.getdisabledhtml()+me.getautocompletehtml();
                    if (me.NumberMin!=0)code+=' min="'+me.NumberMin+'"';
                    if (me.NumberMax!=100)code+=' max="'+me.NumberMax+'"';
                    if (me.NumberStep!=1)code+=' step="'+me.NumberStep+'"';
                    if (me.NumberVal!=0)code+=' value="'+me.NumberVal+'"';
                    code+=' />';
                }
                
                code+='</div>\n';
            }else if (me.Type=="color"){
                code+='    <div>'+me.getlabelhtml();
                if (me.UseJQ){
                    Req.push('ColorPicker Plugin (http://www.eyecon.ro/colorpicker/)');
                    code+='<div id="'+me.ID+'" class="colpick"><div style="background-color:'+me.Value+';"></div></div>';
                    js+='$("#'+me.ID+'").ColorPicker({\n    color: "'+me.Value+'",\n    onBeforeShow:function(colpkr){\n        if ($(colpkr).is(":hidden"))\n            $(colpkr).fadeIn(500);\n            return false;\n    },\n    onHide:function(colpkr){\n        $(colpkr).fadeOut(500);\n        return false;\n    },\n    onChange:function(hsb, hex, rgb){\n        $("#'+me.ID+' div").css("background-color", "#" + hex);\n    }\n});\n\n';
                    
                    var b=me.Value!="#FFFFFF"
                }else{
                    code+='<input type="color"';
                    code+=me.getidhtml()+me.getnamehtml()+me.getdisabledhtml()+me.getautocompletehtml();
                    if (me.Value)code+=' value="'+me.Value+'"';
                    code+=' />';
                }
                code+='</div>\n';
            }else if (me.Type=="date"){
                code+='    <div>'+me.getlabelhtml();
                if (me.UseJQ){
                    Req.push('jQuery UI Datepicker (http://jqueryui.com/download)');
                    js+='$("#'+me.ID+'").datepicker();\n\n';
                    code+='<input type="text"';
                    code+=me.getidhtml()+me.getnamehtml();
                    code+=' />\n';
                }else{
                    code+='<input type="date"';
                    code+=me.getidhtml()+me.getnamehtml();
                    code+=' />\n';
                }
            }else if (me.Type=="time"){
                code+='    <div>'+me.getlabelhtml();
                if (me.UseJQ){
                    Req.push('jQuery UI Core (http://jqueryui.com/download)');
                    Req.push('Timepicker Plugin (http://fgelinas.com/code/timepicker/#requirements)');
                    js+='$("#'+me.ID+'").timepicker();\n\n';
                    code+='<input type="text"';
                    code+=me.getidhtml()+me.getnamehtml();
                    code+=' />\n';
                }else{
                    code+='<input type="time"';
                    code+=me.getidhtml()+me.getnamehtml();
                    code+=' />\n';
                }
            }else{
                code+=me.gethtml();
            }
        }
        
        code+="</form>";
        
        if (Req.length){
            var t="//Requirements:\n";
            for (var i in Req){
                if (typeof Req[i]!="function")
                    t+='//'+Req[i]+'\n';
            }

            t=t.substr(0,t.length-1)+'\n\n';
            js=t+js;
        }
        
        $('#html').val(code);
        $('#js').css('display',((js=='')?'none':'block')).val(js);
        $('#code').slideDown();
    });
    
    //Changing input value handlers
    $SetLabel.keyup(function(){
        Inputs[Selected].label($(this).val()); 
    });
    
    $SetName.keyup(function(){
        Inputs[Selected].name($(this).val());
    });
    
    $SetID.keyup(function(){
        Inputs[Selected].id($(this).val()); 
    });
    
    $SetChecked.change(function(){
        Inputs[Selected].checked($(this).prop('checked'));
    });
    
    $SetDisabled.change(function(){
        Inputs[Selected].disabled($(this).prop('checked'));
    });
    
    $SetCols.keyup(function(){
        Inputs[Selected].cols($(this).val());
    });
    
    $SetRows.keyup(function(){
        Inputs[Selected].rows($(this).val());
    });
    
    $SetMaxLen.keyup(function(){
        Inputs[Selected].maxlen($(this).val()); 
    });
    
    $SetSize.keyup(function(){
        Inputs[Selected].size($(this).val()); 
    });
    
    $SetSliderMin.keyup(function(){
        Inputs[Selected].slidermin($(this).val()); 
    });
    
    $SetSliderMax.keyup(function(){
        Inputs[Selected].slidermax($(this).val());
    });
    
    $SetSliderStep.keyup(function(){
        Inputs[Selected].sliderstep($(this).val()); 
    });
    
    $SetSliderAnim.change(function(){
        Inputs[Selected].slideranim($(this).prop('checked'));
    });
    
    $SetValue.keyup(function(){
        Inputs[Selected].value($(this).val()); 
    });
    
    $SetAutoComplete.change(function(){
        Inputs[Selected].autocomplete($(this).prop('checked'));
    });
    
    $SetNumberMin.change(function(){
        Inputs[Selected].numbermin($(this).val());
    });
    
    $SetNumberMax.change(function(){
        Inputs[Selected].numbermax($(this).val()); 
    });
    
    $SetNumberStep.change(function(){
        Inputs[Selected].numberstep($(this).val()); 
    });
    
    $SetNumberVal.change(function(){
        Inputs[Selected].numberval($(this).val()); 
    });

    $('.info').click(function(){
        prompt('Information',$(this).data('text'),{}); 
    });
});