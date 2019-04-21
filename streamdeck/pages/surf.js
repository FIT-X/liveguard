const request = require("request");
const { setLoading,
    displayText,
    displayTemp,
    displayBeachHacks,
    displayWeatherLogo,
    displayImage } = require('../utils');

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
        },
        action: (myStreamDeck, key) => {
        }
    },
    2: {
        state: (myStreamDeck, key) => {
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