<?php
	$callback = $_GET['callback'];
	
	$contents = false;
	switch($callback){
		case 'offering':
			$contents = file_get_contents('./data/adsoffering.json');
			break;
		case 'wanted':
			$contents = file_get_contents('./data/adswanted.json');
			break;
	}
	
	header('Content-Type: application/json');
	echo $callback . '(' .$contents . ');';