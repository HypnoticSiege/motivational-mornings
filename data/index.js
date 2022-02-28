const config = require('../config')
const jokes = require('./jokes.json');

const randomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    return joke.setup + ' ' + joke.punchline;
};

const getDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    return weekday[d.getDay()];
};

const weather = require('openweather-apis');
weather.setLang('en');
weather.setZipCode(config.openweather.zip);
weather.setCity(config.openweather.city);
weather.setUnits(config.openweather.units);
weather.setAPPID(config.openweather.apiKey);

const getTemp = () => {
    weather.getTemperature(function(err, temp) {
        if (err) {
            console.log(err);
        } else {
            return `${temp}°F in ${config.openweather.city}!`;
        };
    });
};

const getDescription = () => {
    weather.getDescription(function(err, desc) {
        if (err) {
            console.log(err);
        } else {
            return desc
        };
    });
};

module.exports = {
    randomJoke,
    getDay,
    getTemp,
    getDescription
};