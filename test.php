<html>
<head>
<link rel="stylesheet" href="css/ui-darkness/jquery-ui-1.8.14.custom.css" />
<link rel="stylesheet" href="css/colorpicker.css" type="text/css" />
<link rel="stylesheet" href="css/jquery.ui.timepicker-0.2.3.css" type="text/css" />
<script src="js/jquery-1.6.2.min.js"></script>
<script src="js/jquery-ui-1.8.14.custom.min.js"></script>
<script src="js/colorpicker.js"></script>
<script src="js/jquery.ui.timepicker-0.2.3.js"></script>
<script>
$(function(){
    $(".plus").click(function(){
        var $input=$("#"+$(this).data("input"));
        if (parseFloat($input.val())+$input.data("step")<=$input.data("max") && !$input.prop("disabled"))
            $input.val(parseFloat($input.val()) + $input.data("step"));
    });

    $(".minus").click(function(){
        var $input=$("#"+$(this).data("input"));
        if (parseFloat($input.val())-$input.data("step")>=$input.data("min") && !$input.prop("disabled"))
            $input.val(parseFloat($input.val()) - $input.data("step"));
    });
});
</script>
</head>
<body>
<form method="POST" action="">
    <div><label for="no">Label</label> <div style="display:inline-table"><div class="input_number"><input type="text" id="no" value="0" data-min="0" data-max="100" data-step="1" /><div class="line-height:10px;float:right"><a href="javascript:void(0)" class="plus" style="text-decoration:none;font-size:10px" data-input="no">+</a><br /><a href="javascript:void(0)" class="minus" style="text-decoration:none;font-size:10px" data-input="no">-</a></div></div></div></div>
    <div><label for="yes">Label</label> <div style="display:inline-table"><div class="input_number"><input type="text" id="yes" disabled="true" value="0" data-min="0" data-max="100" data-step="1" /><div class="line-height:10px;float:right"><a href="javascript:void(0)" class="plus" style="text-decoration:none;font-size:10px" data-input="yes" disabled="disabled">+</a><br /><a href="javascript:void(0)" class="minus" style="text-decoration:none;font-size:10px" data-input="yes">-</a></div></div></div></div>
</form>
</body>
</html>