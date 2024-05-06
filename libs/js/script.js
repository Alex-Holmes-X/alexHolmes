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
                        // when using the result, try using data without the 0, see if that works
                    $('#sunrise').html(result['sunrise']);
                    $('#sunset').html(result['sunset']);
                    $('#timezoneId').html(result ['timezoneId']);
                    $('#countryName').html(result ['countryName']);
                    
                     
                        
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
        });
    });