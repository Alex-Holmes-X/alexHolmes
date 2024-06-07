<?php



$curl = curl_init();

$latitude = $_REQUEST['latitude'];
$longitude = $_REQUEST['longitude'];

// $latitude = 53.7176054;
// $longitude = -1.7154318;

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.foursquare.com/v3/places/nearby?ll=${latitude}%2C${longitude}&limit=30",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => [
    "Authorization: fsq3GLAT4D3tIg4xiqIiwId2L31KH3zxVxJgB4CelW/wFmo=",
    "accept: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $response;

?>