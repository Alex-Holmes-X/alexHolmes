<?php

    ini_set('display_errors', 'on');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // Url for location data
    
    $url = 'http://api.geonames.org/earthquakesJSON?formatted=true&north=' . $_REQUEST['north'] .'&south=' . $_REQUEST['south'] .'&east=' . $_REQUEST['east'] .'&west=' . $_REQUEST['west'] . '&maxRows=50&username=ajay81&style=full';
    
    // $url = 'http://api.geonames.org/earthquakesJSON?formatted=true&north=37.089801381&south=18.968147&east=11.9984999060001&west=-8.66761116299995&maxRows=50&username=ajay81&style=full';

    

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

    $result = curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result, true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode['earthquakes'];
    $output['url'] = $url;

    header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 


?>
