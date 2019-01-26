

let requestWeatherButton = document.createElement('button');
$(requestWeatherButton).text("request weather for Kyiv");
$("li:eq(1)").next().after(requestWeatherButton);

let requestSubwayWeather = document.createElement('button');
$(requestSubwayWeather).text("request weather by coordinates");
$(requestWeatherButton).after(requestSubwayWeather);


$(requestWeatherButton ).css({"display":"inline-block","margin-top":"10px","margin-right":"20px"});
$(requestSubwayWeather ).css({"display":"inline-block","margin-top":"10px","margin-left":"20px"});


// request server with XMLHTTP weather in Kyiv by city name
$(requestWeatherButton).on('click', function (){
let request = new XMLHttpRequest();
let url ='https://api.openweathermap.org/data/2.5/weather?q=Kiev&APPID=someKey';

request.open('GET', url);
request.onload  = function() {
    var resp = JSON.parse(request.responseText);
    console.log( resp );
    $(requestWeatherButton).next().after(document.createTextNode(
        "\n"+resp.name+" - "+resp.weather[0].main+", скорость ветра (wind speed): "+resp.wind.speed+" "
        +resp.main.temp+", давление (preassure):"+resp.main.pressure+", влажность(humidity): "+resp.main.humidity) );
 };
request.send();


});




// get weather by coordinates longitude and latitude
$(requestSubwayWeather).on('click',  function (){
    
    let coordObol = {lat:50.5009594, lon:30.4973223 };
    //let coordShul = {lat:50.4594034, lon:30.4464503 };
    let coordBobr = {lat:50.3594034, lon:30.1464503 };

    let urlStrings =[getStringURLForWeatherAPI(coordObol),getStringURLForWeatherAPI(coordBobr)];
    
    let requests = urlStrings.map( str => fetch( str ));

    Promise.all(requests)
    .then(responses => Promise.all( responses.map(r => r.json() )))
   //.then(responses => console.log(responses) )
    .then(function(responces){ 
        responces.forEach( function (resp) {
            let text = document.createTextNode(resp.name+" \n "+resp.sys.country+"\n "+JSON.stringify(resp.main)+"\n wind: "+JSON.stringify(resp.wind) );
            $(requestSubwayWeather).after(text);
        } );
     });


});

function getStringURLForWeatherAPI(obj){
    return `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&APPID=someKey` ;
}


