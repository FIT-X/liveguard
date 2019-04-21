const request = require("request");
const { setLoading,
    displayText,
    displayTemp,
    displayBeachHacks,
    displayWeatherLogo,
    displayImage } = require('../utils');

const service_host = 'http://10.32.113.76:8001'
const service_host2 = 'http://10.32.113.76:8002'


const page = {
    0: {
        state: (myStreamDeck, key) => {
            displayImage(myStreamDeck, key, 'back.png')
        },
        action: (myStreamDeck, key, loadPage) => {
            loadPage('home');
        }
    },
    1: {
        state: (myStreamDeck, key) => {
            displayText(myStreamDeck, key, 'Analyze')
        },
        action: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            request(service_host + '/analyze', function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                displayText(myStreamDeck, key, 'Ok');
            });
        }
    },
    2: {
        state: (myStreamDeck, key) => {
            displayText(myStreamDeck, key, 'Display')
        },
        action: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            request(service_host2 + '/display', function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                displayText(myStreamDeck, key, 'Ok');
            });
        }
    },
    3: {
        state: (myStreamDeck, key) => {
        },
        action: (myStreamDeck, key) => {

        }
    },
    4: {
        state: (myStreamDeck, key) => {
        },
        action: (myStreamDeck, key) => {
        }
    },
    5: {
        state: (myStreamDeck, key) => {
        },
        action: (myStreamDeck, key) => {
        }
    },
};

module.exports = {
    page
};