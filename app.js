const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "Your api key"; //Put your openweather-apikey

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",&APPID=" + apikey

  https.get(url, function(response){

    response.on("data", function (data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherdescrip = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p>The weather is currently " + weatherdescrip + "</p>");
    res.write("<h1>The temp in " + query + " is " + temp + " degree Celcius.</h1>");
    res.write("<img src=" + imgURL + ">")
    res.send()
    });
  });
});

app.listen(8000, function(){
  console.log("Server is started on port 8000.");
});
