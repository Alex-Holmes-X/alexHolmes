$(document).ready(function() {

    // This finds the current location and passes the data to the HTML document


    navigator.geolocation.getCurrentPosition(showNewPosition);

    function showNewPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

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
    
                // console.log(JSON.stringify(result));
    
                if (result.status.name == 'ok') {
                        
                    $('#current-country').html(result['data']['results'][0]['components']['country']);
                    $('#current-county').html(result['data']['results'][0]['components']['state_district']);
                    $('#current-city').html(result['data']['results'][0]['components']['city']); 
                    
                    var countryValue= (result['data']['results'][0]['components']['ISO_3166-1_alpha-2'])
                    $('#countrySelect').append(`<option value="${countryValue}">My Location</option>`);

                }

                $.ajax({
                    url: "./libs/php/geoJSONData.php",
                    type: 'POST',
                    dataType: 'json',
                    
                    success: function(result) {
            
                        // console.log(JSON.stringify(result));
            
                        if (result.status.name == 'ok') {
                            // Because the json data has already been parsed to an array of just the country names
                            // this is the only data that it will summarise so you are just looping through 
                            // array 
                                            
                            for(const country of result.data) {
                                // TODO add in the users country first then all the other countries
                                $('#countrySelect').append(`<option value="${country.iso_a2}">${country.name}</option>`);
                            }
            
                        
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
                        countryCode: countryValue,
            
                    },
                    success: function(result) {
            
                        // console.log(JSON.stringify(result));
            
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
                            $('#countryFertility').html(result['data'][0]['fertility']);
                            $('#countryForrestedArea').html(result['data'][0]['forested_area']);
                            $('#countryTourists').html(result['data'][0]['tourists']);
                            $('#countrySpecies').html(result['data'][0]['threatened_species']);
                            $('#countryRefugees').html(result['data'][0]['refugees']);
                            
                            $('#currency1').html(result['data'][0]['currency']['code']);
                            
                         
                            
                        }
            
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        
                        console.log(jqXHR);
                    }
            
                })

                $.ajax({
                    url: "./libs/php/countryInformation.php",
                    type: 'POST',
                    dataType: 'json',
                    data: { 
                        countryCode: countryValue
            
                    },
                    success: function(result) {
            
                        // console.log(JSON.stringify(result));
            
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
                url: "./libs/php/pointsOfInterest.php", //Points of interest !!!!
                type: 'POST',
                dataType: 'json',
                data: {
                    latitude: latitude,
                    longitude: longitude
                },
                
                success: function(result) {
        
                    // console.log(JSON.stringify(result));
        
                    if (result) {
                        
                        const pointsOfInterest = result['results'][0]['geocodes'];
                        console.log(pointsOfInterest);
        
                    
                    }
        
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    
                    console.log(jqXHR);
                }
        
            })

                
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
                console.log(jqXHR);
            }

        })

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
                            exclusions: 'minutely,hourly'
                
                        },
                        success: function(result) {
                
                            // console.log(JSON.stringify(result));
                
                            if (result.status.name == 'ok') {
                                // put new date conversion for seconds here
                                // add in 
                                $('#current-temperature').html(result['data']['current']['temp']);
                                $('#feels-like').html(result['data']['current']['feels_like']);
                                $('#humidity').html(result['data']['current']['humidity']);
                                $('#wind-speed').html(result['data']['current']['wind_speed']);
                                $('#time-zone').html(result['data']['timezone']);                               
                                $('#weatherOverview').html(result['data']['daily'][0]['summary'])
                                $('#dailyAverage').html(result['data']['daily'][0]['temp']['day']);
                                $('#dailyLow').html(result['data']['daily'][0]['temp']['min']);
                                $('#dailyMax').html(result['data']['daily'][0]['temp']['max']);
                                $('#dailyNight').html(result['data']['daily'][0]['temp']['night']);
                                
                                

                                
                                
                                // This is used to create the weather icon
                                var iconCode = (result['data']['current']['weather'][0]['icon']);
                                
                                var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';

                                const sunriseTimestamp = (result['data']['current']['sunrise']) * 1000;
                                const sunriseDate = new Date(sunriseTimestamp);

                                const sunsetTimestamp = (result['data']['current']['sunset']) * 1000;
                                const sunsetDate = new Date(sunsetTimestamp);

                                var sunrise = sunriseDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
                                
                                var sunset = sunsetDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
                               

                                $('#weatherIcon').attr('src', iconUrl);                        

                                $('#sunrise').html(sunrise);
                                $('#sunset').html(sunset);
                                

                                
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
    
                // console.log(JSON.stringify(result));
    
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



    

    // $.ajax({
    //     url: "./libs/php/geoJSONData.php",
    //     type: 'POST',
    //     dataType: 'json',
        
    //     success: function(result) {

    //         console.log(JSON.stringify(result));

    //         if (result.status.name == 'ok') {
    //             // Because the json data has already been parsed to an array of just the country names
    //             // this is the only data that it will summarise so you are just looping through 
    //             // array 
                                
    //             for(const country of result.data) {
    //                 // TODO add in the users country first then all the other countries
    //                 $('#countrySelect').append(`<option value="${country.iso_a2}">${country.name}</option>`);
    //             }

            
    //         }

    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
            
    //         console.log(jqXHR);
    //     }

    // })
    //TODO Turn this back on, using too many calls to website, will run out of API calls
    // $.ajax({
    //             url: "./libs/php/currencyInfo.php",
    //             type: 'POST',
    //             dataType: 'json',
                
        
    //             success: function(result) {
        
    //                 console.log(JSON.stringify(result));
        
    //                 if (result.status.name == 'ok') {               
                        
                        
    //                    var dropdownList = Object.keys(result.data.rates);
                       
                       
                   
    //                    const dropdownOptions2 = document.getElementById('currency2');
             
        
    //                    for (let i = 0; i < dropdownList.length; i++) {
    //                     const option = document.createElement('option');
    //                     option.value = dropdownList[i];
    //                     option.text = dropdownList[i];
    //                     dropdownOptions2.appendChild(option);  
    //                    }
                    
    //                 }
        
    //             },
    //             error: function(jqXHR, textStatus, errorThrown) {
                    
    //                 console.log(jqXHR);
    //             }
        
    //         })

    

});

$('#countrySelect').on('change', function() {
   
    


    
    

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
                // TODO Add these here and make sure to add above on document ready!
                // Fertility 
                $('#countryCapital').html(result['data'][0]['capital']);
                // Tourist Info
                $('#countryCo2Emissions').html(result['data'][0]['co2_emissions']);
                $('#countrySurfaceArea').html(result['data'][0]['surface_area']);
                //Foreested area
                // Threatened Specicies
                
                
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })

    $.ajax({
        url: "./libs/php/geoJSONCountryBorders.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {

                const currentValue = document.getElementById('countrySelect').value; 
                 // gets the current value of the select dropdown box             

                for (const location of result.data) {
                    if (location.properties.iso_a2 === currentValue) {
                        var mapData = location.geometry;
                        var latitude = location.geometry.coordinates[0][0][0][1]; 
                        var longitude = location.geometry.coordinates[0][0][0][0];
                        
                        if(longitude === undefined) {
                            var latitude1 = location.geometry.coordinates[0][0][1]; 
                            var longitude2 = location.geometry.coordinates[0][0][0];
                            L.geoJSON(mapData).addTo(map);
                            map.flyTo([latitude1, longitude2], 4)

                        } else {
                            L.geoJSON(mapData).addTo(map);                        
                            map.flyTo([latitude, longitude], 4)

                        }                        
                       
                    }
                    
                }

            }

            

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })


});





// This is just to make sure i can do the maths on the inputted values

$('#convertButton').on('click', function() {

    // When the api function has been sorted, take the inputted value, * it by the selected 
    // currency and then sumaryise the total
    
    const convertedAmount = document.getElementById('amount').value;

    const roundedTotal = Math.round(convertedAmount * 100) / 100;

    const conversionRate = document.getElementById('currencyName1').value; // add in api response

    const convertedTotal = roundedTotal * conversionRate;

    $('#convertedTotal').html(convertedTotal);

})


$('#getCurrencyRates').on('click', function () {
    $.ajax({
        url: "./libs/php/currencyInfo.php",
        type: 'POST',
        dataType: 'json',
        

        success: function(result) {

            // console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {               
                
               let e1 = document.getElementById('currency1');
               let value1 = e1.value
               console.log(value1);
               $('#currencyName1').html(result['data']['rates'][value1]); 

               let e2 = document.getElementById('currency2');
               let value2 = e2.value
               console.log(value2);
               $('#currencyName2').html(result['data']['rates'][value2]);
                //    **** This just needs to be the value * the currency rate        
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })
});

// TODO Turn this back on when ready to make calls to currency site

// $('#convertButton').on('click', function() {

//     // When the api function has been sorted, take the inputted value, * it by the selected 
//     // currency and then sumaryise the total
    
//     const convertedAmount = document.getElementById('amount').value;
//     console.log(convertedAmount);
//     const roundedTotal = Math.round(convertedAmount * 100) / 100;
//     console.log(roundedTotal);
//     const conversionRate = document.getElementById('currencyName2').innerHTML;
//     console.log(conversionRate);
//     const convertedTotal = convertedAmount * conversionRate;
//     console.log(convertedTotal);
//     $('#convertedTotal').html(convertedTotal);

// });