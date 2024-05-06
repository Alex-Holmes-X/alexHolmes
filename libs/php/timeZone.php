<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url='http://api.geonames.org/timezoneJSON?formatted=true&lat=' . $_REQUEST['lattitude'] . '&lng=' . $_REQUEST['longitude'] . '&username=flightltd&style=full';

    // $url='http://api.geonames.org/timezoneJSON?formatted=true&lat=56.715890&lng=-1.718980&username=flightltd&style=full';

    $ch = curl_init();  // This is creatng the curl request
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);  //This is inputting in the url above

    $result=curl_exec($ch);  // executes the object

    curl_close($ch);

	$decode = json_decode($result,true);

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $decode[];    
    $output['url'] = $url;

    header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>