$(document).ready(function () {

    $('#submit').on('click', function () {

        var userInput = $('#cities').val();

        var apiUrl = config.apiUrl;
        var apiKey = config.apiKey;

        $('#cities').val('');

        $.ajax({

            url: apiUrl + userInput + '&appid=' + apiKey,
            datatype: 'json',
            method: "GET",

            success: function (data) {

                weatherMap(data);
            },

            error: function () {
                alert("City not find. Retry.");
            },

        });

    });

});

// if (navigator.geolocation) {
//     alert('Il tuo browser supporta la geolocalizzazione');
// }
// else {
//     alert('Il browser non supporta la geolocalizzazione');
// }

function get_position(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // é possibile rilevare anche l’altezza
    // (position.coords.altitude)
    console.log(latitudine);
}




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


    $('#cityName').append(cityName);
    $('#weather').append("<b>" + weatherDescription + "</<b>");
    $('#temperature').append("<b>" + kToCel + " °C</<b>");
    $('#wind').append("<b>" + weatherWind + " m/s</<b>");
}
