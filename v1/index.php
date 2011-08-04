<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>formBuild</title>
<script src="jquery-1.4.2.min.js"></script>
<script src="formBuild.js"></script>
<link rel="stylesheet" href="style.css" />
</head>
<body>
<div id="container">
	<div id="head">
	formBuild
    <span class="sm">A web app for web devs by <i><a href="http://pendarenstudios.com" target="_blank">Jason Kaczmarsky</a></i></span>
	</div>
	<div id="body">
        <div id="i_select">
            <h1>1. How many inputs?</h1>
            <input type="text" id="i_num" maxlength="2" size="2" /><br />
            <input type="submit" id="i_submit" value="Submit" />
        </div>
        <div id="saved"></div>
        <div id="i_choose">
            <a href="javascript:void(0)" id="backto1">&lt;&lt; Go Back</a><br />
            <div id="opts"></div>
            <div id="rt"></div>
        </div>
        <div id="code">
            <h1>3. Copy the code!</h1>
            <textarea id="the_code" rows="10" cols="83"></textarea>
            <textarea id="mysql" rows="10" cols="83"></textarea>
            <textarea id="vjs" rows="10" cols="83"></textarea>
            <textarea id="vphp" rows="10" cols="83"></textarea>
        </div>
	</div>
</div>
<div id="popup"></div>
</body>
</html>