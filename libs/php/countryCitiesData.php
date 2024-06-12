<?php

    ini_set('display_errors', 'on');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // Url for location data
    
    $url = 'http://api.geonames.org/citiesJSON?north=' . $_REQUEST['north'] .'&south=' . $_REQUEST['south'] .'&east=' . $_REQUEST['east'] .'&west=' . $_REQUEST['west'] . '&lang=en&maxRows=50&username=ajay81';
    
    // $url = 'http://api.geonames.org/citiesJSON?north=59.3607741849963&south=49.9028622252397&east=1.7689121033873&west=-8.61772077108559&lang=en&maxRows=50&username=ajay81';


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
    $output['data'] = $decode['geonames'];
    $output['url'] = $url;

    header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 


?>