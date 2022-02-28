module.exports = {
    // Twilio Configuration https://www.twilio.com/
    twilio: {
        accountSid: 'YOUR_TWLIO_ACCOUNT_SID',
        authToken: 'YOUR_TWLIO_AUTH_TOKEN',
        fromNumber: 'PHONE_NUMBER',
    },

    // Open Weather API Configuration https://openweathermap.org/
    openweather: {
        apiKey: 'YOUR_OPENWEATHER_API_KEY',
        lang: 'en',
        units: 'imperial',
        city: 'New York City',
        zip: '10001',
    },
};