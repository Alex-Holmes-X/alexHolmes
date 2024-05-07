    $('#btnRun').click(function() {

        $.ajax({
            url: "../task/libs/php/weatherInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lattitude: $('#lattitude').val(),
                longitude: $('#longitude').val()

            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == 'ok') {
                        // when using the result, try using data without the 0, see if that works
                    $('#Temperature').html(result['data']['temperature']);
                    $('#Humidity').html(result['data']['humidity']);
                    $('#WindDirection').html(result['data']['windDirection']);
                    $('#WindSpeed').html(result['data']['windSpeed']);

                    
                    
                     
                    
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });
    });

    // Time Zone API Call Function

    $('#btnRunTZ').click(function() {

        $.ajax({
            url: "../task/libs/php/timeZone.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lattitude: $('#lattitude').val(),
                longitude: $('#longitude').val()

            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == 'ok') {
                        
                    $('#sunrise').html(result['data']['sunrise']);
                    $('#sunset').html(result['data']['sunset']);
                    $('#timezoneId').html(result ['data']['timezoneId']);
                    $('#countryName').html(result ['data']['countryName']);
                    
                     

                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });
    });

    // Airport Weather API Call Function

    $('#btnRunAirport').click(function() {

        $.ajax({
            url: "../task/libs/php/airportWeather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                airport: $('#airport').val()

            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == 'ok') {
                        // when using the result, try using data without the 0, see if that works

                    $('#APICAO').html(result['data']['ICAO']);
                    $('#APElevation').html(result['data']['elevation']);
                    $('#APClouds').html(result['data']['clouds']);
                    $('#APDewPoint').html(result['dat§a']['dewPoint']);
                    $('#APTemperature').html(result['data']['temperature']);
                    $('#APHumidity').html(result['data']['humidity']);
                    $('#APStationName').html(result['data']['stationName']);
                                    
                                       
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });
    });