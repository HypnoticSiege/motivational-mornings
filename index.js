const config = require('./config');
const {
    randomJoke,
    getDay,
} = require('./data');

const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);


async function sendMessage() {
    client.messages.create({
        body: `Good Morning! 🌅 Today is ${getDay()} woooo! It's 33°F in ${config.openweather.city} and Cloudy. Here's a joke to start your day 😂 ${randomJoke()}`,
        from: config.twilio.fromNumber,
        to: '+16098150544',
    }).then(message => console.log(message.sid));
};

const CronJob = require('cron').CronJob;
const job = new CronJob('0 6 * * *', function() {
    sendMessage();
}, function() {
    console.log('Job stopped');
}, true, 'America/New_York');