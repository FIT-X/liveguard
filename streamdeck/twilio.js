const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM_NUMBER;

if (!accountSid) console.warn('Missing process.env.TWILIO_ACCOUNTSID');
if (!authToken) console.warn('Missing process.env.TWILIO_AUTH_TOKEN');
if (!from) console.warn('Missing process.env.TWILIO_FROM_NUMBER');

const twilio = require('twilio');

function sendSMS(to, msg) {
    const client = new twilio(accountSid, authToken);
    client.messages.create({
        body: msg || 'Hello from Node',
        to,
        from
    })
        .then((message) => console.log(message.sid));
}



module.exports = {
    sendSMS
}