$(document).ready(function () {

    $('#submit').on('click', function () {

        var userInput = $('#cities').val();
        // console.log(userInput);
        $('#cities').val('');

        $.ajax({

            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=6218c6f9b89e92cddd23f5caef300507',
            datatype: 'json',
            method: "GET",


            success: function (data) {
                console.log(data);
                weatherMap(data);
            },

            error: function () {
                alert("Errore");
            },

        });

    });

});

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


// var config = {
//     apiKey: '6218c6f9b89e92cddd23f5caef300507',
//     apiUrl: 'http://api.openweathermap.org/data/2.5/weather?q='
// }