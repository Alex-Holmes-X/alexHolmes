    $('#btnRun').click(function() {

        $.ajax({
            url: "libs/php/weatherInfo.php",
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
                    $('#txtTemperature').html(result['data'][0]['temperature']);
                    $('#txtHumidity').html(result['data'][0]['humidity']);
                    $('#txtWindDirection').html(result['data'][0]['windDirection']);
                    $('#txtWindSpeed').html(result['data'][0]['windSpeed']);
                    
                     
                    
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
            url: "libs/php/timeZone.php",
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
                    $('#sunrise').html(result['data']['sunrise']);
                    $('#sunset').html(result['data']['sunset']);
                    $('#timezoneId').html(result['data']['timezoneId']);
                    $('#countryName').html(result['data']['countryName']);
                    
                     
                    
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });
    });