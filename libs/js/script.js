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
                    $('#current-village').html(result['data']['results'][0]['components']['village']);
                    $('#current-neighbourhood').html(result['data']['results'][0]['components']['neighbourhood']); 
                    $('#current-city').html(result['data']['results'][0]['components']['city']); 
                    
                //    Make a function to hide neighbourhood if blank
                    
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
                                $('#time-zone').html(result['data']['timezone']);
                                
                                
                                // This is used to create the weather icon
                                var iconCode = (result['data']['current']['weather'][0]['icon']);
                                
                                var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';

                                const sunriseTimestamp = (result['data']['current']['sunrise']) * 1000;
                                const sunriseDate = new Date(sunriseTimestamp);

                                const sunsetTimestamp = (result['data']['current']['sunset']) * 1000;
                                const sunsetDate = new Date(sunsetTimestamp);

                                var sunrise = sunriseDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
                                console.log(sunrise);
                                var sunset = sunsetDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
                                console.log(sunset)

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

    $.ajax({
        url: "./libs/php/geoJSONData.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {

                var countrySelect = Object.values([0])
                console.log(countrySelect);

                var countrySelectList = []
                for (let x = 0; x < countrySelect.length; i++) {
                    countrySelectList.push(countrySelect[x].properties.name)
                    console.log(countrySelectList);
                }
                            
                
                
                console.log(countrySelect);
                
               
            //    const dropdownOptions = document.getElementById('countrySelect');
               

            //    for (let i = 0; i < countrySelect.length; i++) {
            //     const option = document.createElement('option');
            //     option.value = countrySelect[i];
            //     option.text = countrySelect[i];
            //     dropdownOptions.appendChild(option);
            //     console.log(option.value);
            //    }

            console.log(result.data.properties)
                
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            console.log(jqXHR);
        }

    })

});

$('#countrySelect').on('change', function() {

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


$('#countryBorders').on('click', () => {

    $.ajax({
        url: "./libs/php/geoJSONData.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == 'ok') {
                    
                var mapData = result.data;
                L.geoJSON(mapData).addTo(map)
                
                
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

    const conversionRate = 0.852362;

    const convertedTotal = roundedTotal * conversionRate;

    $('#convertedTotal').html(convertedTotal);

})





// Open this back up later, making too many API Calls at the minute !!!! 

// $('#countryCurrencyData').on('click', function () {
//     $.ajax({
//         url: "./libs/php/currencyInfo.php",
//         type: 'POST',
//         dataType: 'json',
        

//         success: function(result) {

//             console.log(JSON.stringify(result));

            // if (result.status.name == 'ok') {               
                
                
            //    var dropdownList = Object.keys(result.data.rates);
               
               
            //    const dropdownOptions1 = document.getElementById('currency1');
            //    const dropdownOptions2 = document.getElementById('currency2');

            //    for (let i = 0; i < dropdownList.length; i++) {
            //     const option = document.createElement('option');
            //     option.value = dropdownList[i];
            //     option.text = dropdownList[i];
            //     dropdownOptions1.appendChild(option);
            //    }

            //    for (let i = 0; i < dropdownList.length; i++) {
            //     const option = document.createElement('option');
            //     option.value = dropdownList[i];
            //     option.text = dropdownList[i];
            //     dropdownOptions2.appendChild(option);  
            //    }
            // //    let e = document.getElementById('currency1');
            // //    let value = e.value
            // //    console.log(value);
            // //    $('#currencyName1').html(result['data']['rates'][value]); //Works
                          
            // }

//         },
//         error: function(jqXHR, textStatus, errorThrown) {
            
//             console.log(jqXHR);
//         }

//     })
// });

// $('#convertButton').on('click', function () {
//     $.ajax({
//         url: "./libs/php/currencyInfo.php",
//         type: 'POST',
//         dataType: 'json',
        

//         success: function(result) {

//             // console.log(JSON.stringify(result));

//             if (result.status.name == 'ok') {               
                
//                let e1 = document.getElementById('currency1');
//                let value1 = e1.value
//                console.log(value1);
//                $('#currencyName1').html(result['data']['rates'][value1]); 

//                let e2 = document.getElementById('currency2');
//                let value2 = e2.value
//                console.log(value2);
//                $('#currencyName2').html(result['data']['rates'][value2]);
                   // **** This just needs to be the value * the currency rate        
//             }

//         },
//         error: function(jqXHR, textStatus, errorThrown) {
            
//             console.log(jqXHR);
//         }

//     })
// });