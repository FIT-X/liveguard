const request = require("request");
const { setLoading,
    displayText,
    displayTextSmall,
    displayBeachHacks,
    displayWeatherLogo,
    displayImage,
    drawBitmoji } = require('../utils');
const { sendSMS } = require('../twilio');
const { serialEmitter } = require('../serial');

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
            setLoading(myStreamDeck, key)
            serialEmitter.on('data', data => {
                displayTextSmall(myStreamDeck, key, data.H + ' %')
            });

        },
        action: (myStreamDeck, key) => {
        }
    },
    2: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key)
            serialEmitter.on('data', data => {
                displayTextSmall(myStreamDeck, key, data.t + ' F')
            });

        },
        action: (myStreamDeck, key) => {
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
            setLoading(myStreamDeck, key)
            serialEmitter.on('data', data => {
                displayTextSmall(myStreamDeck, key, data.g)
            });
        },
        action: (myStreamDeck, key) => {
        }
    },
    5: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key)
            serialEmitter.on('data', data => {
                displayTextSmall(myStreamDeck, key, data.d)
            });
        },
        action: (myStreamDeck, key) => {
        }
    },
};

module.exports = {
    page
};