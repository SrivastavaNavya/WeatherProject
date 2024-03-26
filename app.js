const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "95acde34db610eebff84b2c7c6043e72";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icode = weatherData.weather[0].icon;
            const iurl = "http://openweathermap.org/img/wn/" + icode + "@2x.png";
            res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius.</h1>");
            res.write("<h4>The weather in "+query+" is " + weatherDesc + ".</h4>");
            res.write("<img src=" + iurl + ">");
            res.send();
        })
    })
});




app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
