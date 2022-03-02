import * as config from '../config';
import * as jokes from '../data/jokes.json';
import * as quotes from '../data/quotes.json';
import * as schedule from "node-schedule";
import { Twilio } from 'twilio';

const client = new Twilio(config.twilio.accountSid, config.twilio.authToken);

const randomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    return joke.setup + ' ' + joke.punchline;
};

const randomQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return quote.quoteText + ' - ' + quote.quoteAuthor;
};

const getDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();

    return weekday[d.getDay()];
};

const generateMessage = () => {
    const base = `Here is your daily message: `;
    const baseBody = base + `Good Morning! 🌅 Today is ${getDay()} woooo! `

    let fullBody;

    if (config.message.recieve == 'quote') {
        fullBody = baseBody + `Here's a quote for you 📚. ${randomQuote()}`;
    } else if (config.message.recieve == 'joke') {
        fullBody = baseBody + `Here's a joke for you 😂. ${randomJoke()}`;
    } else if (config.message.recieve == 'both') {
        fullBody = baseBody + `Here's a joke for you 😂. ${randomJoke()} Here's a quote for you 📚. ${randomQuote()}`;
    } else {
        fullBody = baseBody + `It seems like you have not set a valid value to recieve jokes or quotes in your "config.js" file. Please check the "config.js" file and try again.`;
    };

    return fullBody;
};

const sendMessage = () => {
    if (config.twilio.accountSid && config.twilio.authToken && config.twilio.fromNumber) {
        client.messages.create({
            body: generateMessage(),
            to: '+16098150544',
            from: config.twilio.fromNumber
        }).then(message => console.log(message.sid));
    } else {
        console.error('Missing Twilio configuration');
    };
};

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 23;
rule.minute = 38;
schedule.scheduleJob(rule, async function () {
    console.log('Time to send message!');
    sendMessage();
});