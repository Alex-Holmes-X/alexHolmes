<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

// Url for location data 
// TODO Turn back on!
// $url = 'http://api.exchangeratesapi.io/v1/latest?access_key=85cad2bd12cbffb035ce0c10fd021f4e';

$result = file_get_contents('currencyTempInfo.json');

// TODO Turn back on!
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_URL,$url);


// TODO Turn back on!
// $result = curl_exec($ch); (TURN BACK ON!)

// TODO Turn back on!
// curl_close($ch); (TURN BACK ON!)

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['data'];
// $output['url'] = $url;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 




?>