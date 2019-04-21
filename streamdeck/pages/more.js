const request = require("request");
const { setLoading,
    drawBitmoji,
    displayImage } = require('../utils');
const { sendSMS } = require('../twilio');

const cell1 = process.env.CELL_1;
const cell2 = process.env.CELL_2;
const cell3 = process.env.CELL_3;

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
            displayImage(myStreamDeck, key, 'riptide.png')
        },
        action: (myStreamDeck, key) => {
        }
    },
    2: {
        state: (myStreamDeck, key) => {
            displayImage(myStreamDeck, key, 'forecast.png')

        },
        action: (myStreamDeck, key) => {
        }
    },
    3: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            drawBitmoji(myStreamDeck, key, '306434327_2');
        },
        action: (myStreamDeck, key) => {
            sendSMS(cell1, 'Emergency! Please come to the deck!');
        }
    },
    4: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            drawBitmoji(myStreamDeck, key, '518941734_5');
        },
        action: (myStreamDeck, key) => {
            sendSMS(cell2, 'Emergency! Please come to the deck!');
        }
    },
    5: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            drawBitmoji(myStreamDeck, key, '562861572_1-s5');
        },
        action: (myStreamDeck, key) => {
            sendSMS(cell3, 'Emergency! Please come to the deck!');
        }
    },

};

module.exports = {
    page
};