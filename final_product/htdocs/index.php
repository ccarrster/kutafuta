<?php
	require_once 'includes/functions_render.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>$$$$ KUTAFUTA $$$$</title>
	<link rel="stylesheet" type="text/css" href="/css/style.css" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<script src="/js/jquery-1.9.0.min.js"></script>
	<script src="/js/DogAndPony.js"></script>
	<script src="/jsonp.php?callback=wanted"></script>
	<script src="/jsonp.php?callback=offering"></script>
</head>
<body>
	<div>
		<h3> Choose your Car</h3>
		Make: <select name="makes" id="makes" onchange="makesValue()"></select><br>
		Model: <select name="models" id="models" onchange="modelsValue()"></select><br>
		Year: <select name="years" id="years" onchange="yearsValue()"></select><br>
		<input type="button" name="kutafuta" class="button" value="KutaFuta!" onclick="kutafuta()"/>
	</div>
	<div id="profit"></div>
	<div class="matches" style="height: 300px; overflow-x: hidden; overflow-y: scroll;">
		<div class="wanted col2">
			<h2>Wanted</h2>
			<!-- (sort price descending) -->
			<div id="wanted"></div>
		</div>
		<div class="offering col2">
			<h2>Offering</h2>
			<!-- (sort price ascending) -->
			<div id="offering"></div>
		</div>
	</div>
	<div class="compare">
		<div id="wanted_selected" class="col2"></div>
		<div id="offering_selected" class="col2"></div>
	</div>
</body>
<!--
details of each selected
profit margin
link to each kijiji ad to post/respond
...profit!
-->