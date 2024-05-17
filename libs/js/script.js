$(document).ready(function() {

    // This finds the current location and passes the data to the HTML document

    navigator.geolocation.getCurrentPosition(showNewPosition);

    function showNewPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;


        // This populates the data in the current location section in the HTML document.

        $.ajax({
            url: "./libs/php/currentLocationInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                latitude: latitude,
                longitude: longitude
    
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
    
                if (result.status.name == 'ok') {
                        
                    $('#current-country').html(result['data']['results'][0]['components']['country']);
                    $('#current-county').html(result['data']['results'][0]['components']['state_district']);
                    $('#current-area').html(result['data']['results'][0]['components']['village']);                     
                    
                }
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });

                    // This is the weather API call

                    var apiKey = 'f6c21b786b9ae229c8b4f120f3761eaf';
                    // var exclusions = [minutely,hourly,daily,alerts];   

                    $.ajax({
                        url: "./libs/php/weatherData.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            latitude: latitude,
                            longitude: longitude,
                            apiKey: apiKey,
                            exclusions: 'minutely,hourly,daily'
                
                        },
                        success: function(result) {
                
                            console.log(JSON.stringify(result));
                
                            if (result.status.name == 'ok') {
                                // put new date conversion for seconds here
                                // add in 
                                $('#current-temperature').html(result['data']['current']['temp']);
                                $('#feels-like').html(result['data']['current']['feels_like']);
                                $('#humidity').html(result['data']['current']['humidity']);
                                $('#wind-speed').html(result['data']['current']['wind_speed']);
                                
                                // This is used to create the weather icon
                                var iconCode = (result['data']['current']['weather'][0]['icon']);
                                
                                var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';

                                $('#weatherIcon').attr('src', iconUrl);
                                
                                
                            }
                
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            
                            console.log(jqXHR);
                            
                        }
                    });

    }

    // New API call under here

});