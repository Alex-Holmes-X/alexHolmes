<?php

    ini_set('display_errors', 'on');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // Url for location data
    $url = 'https://api.openweathermap.org/data/3.0/onecall?lat='. $_REQUEST['latitude'] . '&lon=' . $_REQUEST['longitude'] . '&exclude=' . $_REQUEST['exclusions'] . '&units=metric' . '&appid=' . $_REQUEST['apiKey'] . '';


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
    $output['data'] = $decode;
    $output['url'] = $url;

    header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 


?>