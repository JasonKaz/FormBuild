<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <title>FormBuild</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/ui-darkness/jquery-ui-1.8.14.custom.css" />
    <link rel="stylesheet" href="css/colorpicker.css" type="text/css" />
    <link rel="stylesheet" href="css/jquery.ui.timepicker-0.2.3.css" type="text/css" />
    <style>
	#sortable { list-style-type: none; margin: 0; padding: 0; }
    .ui-state-default   {background:none;border:0;}
	</style>
    <script src="js/jquery-1.6.2.min.js"></script>
    <script src="js/jquery-ui-1.8.14.custom.min.js"></script>
    <script src="js/modernizr.js"></script>
    <script src="js/formbuild.js"></script>
    <script src="js/colorpicker.js"></script>
    <script src="js/jquery.ui.timepicker-0.2.3.js"></script>
    <script>
    var InputList=[],
    HasFalse=false;
    for(var i in Modernizr.inputtypes){
        InputList.push([i,Modernizr.inputtypes[i]]);
        if (Modernizr.inputtypes[i]==false)
            HasFalse=true
    }
    </script>
</head>
<body>
    <div id="head_bg"></div>
    <div id="container">
    	<div id="head">
    	FormBuild
        <span class="sm">A web app for web devs by <i><a href="http://pendarenstudios.com" target="_blank">Jason Kaczmarsky</a></i></span>
    	</div>
    	<div id="body">
            <div id="inputs">
                <h1>Inputs</h1>
                <div class="block">
                <h3>Supported</h3> <img src="images/q.png" class="info" data-text="These inputs are either fully or partially implemented into your current browser.<br />Check <a href='http://caniuse.com/#feat=forms' target='_blank'>CanIUse.com</a> to see total support and <a href='http://www.miketaylr.com/code/input-type-attr.html' target='_blank'>MikeTaylr.com</a> to see your browser support." /> <br />
                <script>
                for (var i in AvailInputs){
                    document.write('<a href="javascript:void(0)" id="'+AvailInputs[i]+'" class="add">'+AvailInputs[i]+'</a><br />');
                }
                for(var i in InputList){
                    if (InputList[i][1]==true)
                        document.write('<a href="javascript:void(0)" id="'+InputList[i][0]+'" class="add">'+InputList[i][0]+'</a><br />');
                }
                
                if (HasFalse){
                    document.write('<h3>Not Supported</h3> <img src="images/q.png" class="info" data-text="These inputs are <strong><em>not</em></strong> implemented into your current browser, but maybe others. <em>Some have JavaScript replacements though.</em> <br />Check <a href=\'http://www.quirksmode.org/html5/inputs.html\' target=\'_blank\'>QuirksMode.com</a> to see what browsers do support these inputs." /><br /><div id="unsupported_inputs">');
                    for(var i in InputList){
                        if (InputList[i][1]==false)
                            document.write('<a href="javascript:void(0)" id="'+InputList[i][0]+'" class="add">'+InputList[i][0]+'</a><br />');
                    }
                    document.write('</div>');
                }
                </script>
                </div>
            </div>
            <div id="preview">
                <h1>Form Preview</h1>
                <div class="block" id="form" style="padding: 5px;">
                <ul id="sortable">
                
                </ul>
                </div>
                <br />
                <div class="block hidden" id="code">
                    <h2>JavaScript</h2>
                    <textarea cols="59" rows="10" id="js"></textarea>
                    <h2>Markup</h2>
                    <textarea cols="59" rows="10" id="html"></textarea>
                </div>
            </div>
            <div id="options" class="">
                <h1>Options</h1>
                <div class="block" id="attr">
                    <h2>Form Attributes</h2>
                    <div><label for="form_method">Method</label> <select id="form_method"><option selected>POST</option><option>GET</option><option>REQUEST</option></select></div>
                    <div><label for="form_action">Action</label> <input type="text" id="form_action" /></div>
                    <br /><br />
                    <h2>Input Attributes</h2>
                    <div id="setinput_label_div" class="hidden"><label for="setinput_label">Label</label> <input type="text" id="setinput_label" /></div>
                    <div id="setinput_id_div" class="hidden"><label for="setinput_id">ID</label> <input type="text" id="setinput_id" /></div>
                    <div id="setinput_name_div" class="hidden"><label for="setinput_name">Name</label> <input type="text" id="setinput_name" /></div>
                    <div id="setinput_disabled_div" class="hidden"><label for="setinput_disabled">Disabled</label> <input type="checkbox" id="setinput_disabled" /></div>
                    <div id="setinput_max_len_div" class="hidden"><label for="setinput_maxlen">Max Len</label> <input type="text" id="setinput_maxlen" size="3" /></div>
                    <div id="setinput_size_div" class="hidden"><label for="setinput_size">Size</label> <input type="text" id="setinput_size" size="3" /></div>
                    <div id="setinput_checked_div" class="hidden"><label for="setinput_checked">Checked</label> <input type="checkbox" id="setinput_checked" /></div>
                    <div id="setinput_autocomplete_div" class="hidden"><label for="setinput_autocomplete">Auto Complete</label> <input type="checkbox" id="setinput_autocomplete" /></div>
                    <div id="setinput_value_div" class="hidden"><label for="setinput_value">Value</label> <input type="text" id="setinput_value" size="8" /></div>
                    <div id="setinput_cols_div" class="hidden"><label for="setinput_cols">Columns</label> <input type="text" id="setinput_cols" size="3" /></div>
                    <div id="setinput_rows_div" class="hidden"><label for="setinput_rows">Rows</label> <input type="text" id="setinput_rows" size="3" /></div>
                    <div id="setinput_range_min_div" class="hidden"><label for="setinput_range_min">Min</label> <input type="text" id="setinput_range_min" size="3" /></div>
                    <div id="setinput_range_max_div" class="hidden"><label for="setinput_range_max">Max</label> <input type="text" id="setinput_range_max" size="3" /></div>
                    <div id="setinput_range_step_div" class="hidden"><label for="setinput_range_step">Step</label> <input type="text" id="setinput_range_step" size="3" /></div>
                    <div id="setinput_number_min_div" class="hidden"><label for="setinput_number_min">Min</label> <input type="text" id="setinput_number_min" maxlength="3" size="3" /></div>
                    <div id="setinput_number_max_div" class="hidden"><label for="setinput_number_max">Max</label> <input type="text" id="setinput_number_max" maxlength="3" size="3" /></div>
                    <div id="setinput_number_step_div" class="hidden"><label for="setinput_number_step">Step</label> <input type="text" id="setinput_number_step" maxlength="3" size="3" /></div>
                    <div id="setinput_number_value_div" class="hidden"><label for="setinput_number_val">Value</label> <input type="text" id="setinput_number_val" maxlength="3" size="3" /></div>
                    <div id="setinput_range_anim_div" class="hidden"><label for="setinput_range_anim">Animate</label> <input type="checkbox" id="setinput_range_anim" /></div>
                    <div id="setinput_extrainfo_div" class="hidden"></div>
                    <br />
                    <a href="javascript:void(0)" id="get_code">Get Code</a>
                </div>
            </div>
    	</div>
    </div>
    <div id="dialog" class="hidden"></div>
</body>
</html>