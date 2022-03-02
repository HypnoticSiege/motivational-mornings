// Import all modules & initialize Twilio client
const config = require('./config');
const jokes = require('./data/jokes.json');
const quotes = require('./data/quotes.json');
const schedule = require('node-schedule');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

// Randome Joke Generator
const randomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)]; // Get the joke from JSON array

    return joke.setup + ' ' + joke.punchline; // Return the joke
};

// Random Quote Generator
const randomQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]; // Get the quote from JSON array

    return quote.quoteText + ' - ' + quote.quoteAuthor; // Return the quote
};

// Get the current day of the week
const getDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // Array of days of the week
    const d = new Date(); // Get the current date

    return weekday[d.getDay()]; // Return the current day of the week
};

// Generate the message to send (Make the body w/ the appropriate message configuration)
const generateMessage = () => {
    const base = `Here is your daily message: `; // Base message to start with
    const baseBody = base + `Good Morning! 🌅 Today is ${getDay()} woooo! ` // The body (Actual message begin)

    let fullBody; // A variable to hold the full message later

    switch (config.message.recieve) { // Switch statement to determine what message to send
        case 'quote': // If the user wants to recieve a quote
            fullBody = baseBody + `Here's a quote for you 📚. ${randomQuote()}`; // Add the quote to the message
            break;
        case 'joke': // If the user wants to recieve a joke
            fullBody = baseBody + `Here's a joke for you 😂. ${randomJoke()}`; // Add the joke to the message
            break;
        case 'both': // If the user wants to recieve both a joke and a quote
            fullBody = baseBody + `Here's a joke for you 😂. ${randomJoke()} Here's a quote for you 📚. ${randomQuote()}`; // Add the joke and quote to the message
            break;
        default:
            break;
    };

    return fullBody; // Return the full message to send
};

// Actual function to send the message to the user
const sendMessage = () => {
    if (config.twilio.accountSid && config.twilio.authToken && config.twilio.fromNumber) { // If the user has set all the required values
        client.messages.create({ // Create the message
            body: generateMessage(), //Generate the message body with function located above
            to: config.twilio.toNumber, // The user's phone number
            from: config.twilio.fromNumber // The Twilio number to send the message from
        }).then(message => console.log(message.sid)); // Log the message ID
    } else { // If the user hasn't set all the required values
        console.error('Missing Twilio configuration'); // Log an error
    };
};

// Cron Schedule for the message to be sent
var rule = new schedule.RecurrenceRule();

// Set time to send the message
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = config.time.hour;
rule.minute = config.time.minute;
rule.second = config.time.second;

// Schedule the job
schedule.scheduleJob(rule, async function() {
    console.log('Time to send message!');
    sendMessage(); // Send the message
});