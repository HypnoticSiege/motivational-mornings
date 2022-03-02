module.exports = {
    // Twilio Configuration https://www.twilio.com/
    twilio: {
        accountSid: 'YOUR_TWLIO_ACCOUNT_SID',
        authToken: 'YOUR_TWLIO_AUTH_TOKEN',
        fromNumber: 'TWILIO_PHONE_NUMBER',
        toNumber: 'YOUR_PHONE_NUMBER'
    },

    // Time to send the message
    time: {
        hour: 06,
        minute: 00,
        second: 0
    },

    // Message Configuration
    message: {
        recieve: "quote", // quote, joke, or both
        weather: true, // true or false
    }
};