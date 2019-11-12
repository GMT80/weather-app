$(document).ready(function () {

    apiUrl = config.apiUrl;
    apiKey = config.apiKey;
    apiGeo = config.apiGeo;

    $('#geo').on('click', function () {

        formInput = $('input#cities[placeholder]').val('Your Position');
        $('#cities').addClass('isClicked');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocation);
        }

        function getLocation(position) {

            wlat = (position.coords.latitude).toFixed(2);
            wlong = (position.coords.longitude).toFixed(2);
            urlpath = apiGeo + 'lat=' + wlat + "&lon=" + wlong + '&appid=' + apiKey;
            // Load the weather now that we've got the urlpath
            loadWeatherData();
        }

        function loadWeatherData() {
            // Ajax call goes in here

            $('#submit').on('click', function () {

                city = $('#cities').val();
                $('#loader').removeClass("hide-loader");
                $('#cities').val('');

                $.ajax({

                    url: urlpath,
                    datatype: 'json',
                    method: "GET",

                    success: function (data) {

                        delay(function () {
                            weatherMap(data);
                        }, 200);
                    },

                    error: function () {

                    },

                });

            });
        }

    });



    $('#submit').on('click', function () {

        city = $('#cities').val();
        apiCall = apiUrl + city + '&appid=' + apiKey;

        $('#loader').removeClass("hide-loader");

        $('#cities').val('');

        $.ajax({

            url: apiCall,
            datatype: 'json',
            method: "GET",

            success: function (data) {

                delay(function () {
                    weatherMap(data);
                }, 200);
            },

            error: function () {

            },

        });

    });


});

// Close JS


// FUNCTIONS

function weatherMap(data) {

    var cityName = data.name;
    var weatherDescription = data.weather[0].description;
    var weatherTemp = data.main.temp;
    var weatherWind = data.wind.speed;

    var kToCel = parseInt(weatherTemp - 273.15);


    $('#cityName').html('');
    $('#weather').html('');
    $('#temperature').html('');
    $('#wind').html('');

    $('#loader').addClass("hide-loader");

    $('#cityName').append(cityName);
    $('#weather').append("<b>" + weatherDescription + "</<b>");
    $('#temperature').append("<b>" + kToCel + " °C</<b>");
    $('#wind').append("<b>" + weatherWind + " m/s</<b>");

};


var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

