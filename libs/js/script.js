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
        // This call defaults the initial modal buttons to GB
        $.ajax({
            url: "./libs/php/countryInformation.php",
            type: 'POST',
            dataType: 'json',
            data: { 
                countryCode: $('#countrySelect').val()
    
            },
            success: function(result) {
    
                console.log(JSON.stringify(result));
    
                if (result.status.name == 'ok') {
                        
                    $('#flag-icon').html(result['data'][0]['flag']);
    
                    
                    // Icon images
                    var flag = (result['data'][0]['flags']['svg']);                
                    $('#main-country-flag').attr('src', flag);
            
                    var coa = (result['data'][0]['coatOfArms']['svg']);                
                    $('#coat-of-arms').attr('src', coa);
                    
                    
                }
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }
    
    })

    $.ajax({
        url: "./libs/php/countryStatistics.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            countryCode: $('#countrySelect').val()

        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {
                    
                $('#countryPopulation').html(result['data'][0]['population']);
                $('#countryUnemployment').html(result['data'][0]['unemployment']);
                $('#countryHomicideRate').html(result['data'][0]['homicide_rate']);
                $('#countryCurrency').html(result['data'][0]['currency']['name']);
                $('#countryMaleLifeExpectancy').html(result['data'][0]['life_expectancy_male']);
                $('#countryFemaleLifeExpectancy').html(result['data'][0]['life_expectancy_female']);
                $('#countryCapital').html(result['data'][0]['capital']);
                $('#countryCo2Emissions').html(result['data'][0]['co2_emissions']);
                $('#countrySurfaceArea').html(result['data'][0]['surface_area']);
                
                
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })
        

});

$('#btnCountries').click(function() {

    if (document.getElementById('countrySelect').value === 'gbr') {
        map.flyTo([51.509865, -0.118092], 8)
    } else if (document.getElementById('countrySelect').value === 'usa') {
        map.flyTo([38.907192, -77.036873], 8)
    } else if (document.getElementById('countrySelect').value === 'aus') {
        map.flyTo([-35.282001, 149.128998], 8)
    } else if (document.getElementById('countrySelect').value === 'chn') {
        map.flyTo([39.916668, 116.383331], 8)
    } else if (document.getElementById('countrySelect').value === 'rus') {
        map.flyTo([55.751244, 37.618423], 8)
    } else if (document.getElementById('countrySelect').value === 'ind') {
        map.flyTo([28.644800, 77.216721], 8)
    };


    $.ajax({
        url: "./libs/php/countryInformation.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            countryCode: $('#countrySelect').val()

        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {
                    
                $('#flag-icon').html(result['data'][0]['flag']);

                
                // Icon images
                var flag = (result['data'][0]['flags']['svg']);                
                $('#main-country-flag').attr('src', flag);
        
                var coa = (result['data'][0]['coatOfArms']['svg']);                
                $('#coat-of-arms').attr('src', coa);
                
                
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

})
    

    $.ajax({
        url: "./libs/php/countryStatistics.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            countryCode: $('#countrySelect').val()

        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {
                    
                $('#countryPopulation').html(result['data'][0]['population']);
                $('#countryUnemployment').html(result['data'][0]['unemployment']);
                $('#countryHomicideRate').html(result['data'][0]['homicide_rate']);
                $('#countryCurrency').html(result['data'][0]['currency']['name']);
                $('#countryMaleLifeExpectancy').html(result['data'][0]['life_expectancy_male']);
                $('#countryFemaleLifeExpectancy').html(result['data'][0]['life_expectancy_female']);
                $('#countryCapital').html(result['data'][0]['capital']);
                $('#countryCo2Emissions').html(result['data'][0]['co2_emissions']);
                $('#countrySurfaceArea').html(result['data'][0]['surface_area']);
                
                
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })

    


});


// Location Buttons

$('#countryUsa').click(function() {
    map.flyTo([40.737, -73.923], 8)
})

$('#countryUk').click(function() {
    map.flyto([51.509865, -0.118092], 8)
})