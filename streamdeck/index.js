require('dotenv').config();

const throttle = require('lodash.throttle');

const sharp = require('sharp');

const StreamDeck = require('elgato-stream-deck-clean-mini');
const { createCanvas } = require('canvas');

const {serialEmitter} = require('./serial');

let page = 0;

console.log('Starting...');

const { setLoading,
    displayText,
    displayTemp,
    displayBeachHacks,
    displayWeatherLogo } = require('./utils');

const initPage = require('./pages/init').page;
const homePage = require('./pages/home').page;
const morePage = require('./pages/more').page;
const sensorPage = require('./pages/sensor').page;
const surfPage = require('./pages/surf').page;

const pages = {
    'init' : initPage,
    'home': homePage,
    'more': morePage,
    'sensor': sensorPage,
    'surf': surfPage
}

// Automatically discovers connected Stream Deck Minis, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid
const myStreamDeck = new StreamDeck();

myStreamDeck.on('down', keyIndex => {
    console.log('key %d down', keyIndex);
});

let currentPage;

function loadPage(page) {
    myStreamDeck.clearAllKeys();
    console.log('Page:' + page);
    currentPage = pages[page];
    for (p in currentPage) {
        currentPage[p].state(myStreamDeck, p);
    }
}

function key0Pressed() { currentPage[0].action(myStreamDeck, 0, loadPage); }
function key1Pressed() { currentPage[1].action(myStreamDeck, 1, loadPage); }
function key2Pressed() { currentPage[2].action(myStreamDeck, 2, loadPage); }
function key3Pressed() { currentPage[3].action(myStreamDeck, 3, loadPage); }
function key4Pressed() { currentPage[4].action(myStreamDeck, 4, loadPage); }
function key5Pressed() { currentPage[5].action(myStreamDeck, 5, loadPage); }

const key0Action = throttle(key0Pressed, 2000, { 'trailing': false });
const key1Action = throttle(key1Pressed, 2000, { 'trailing': false });
const key2Action = throttle(key2Pressed, 2000, { 'trailing': false });
const key3Action = throttle(key3Pressed, 2000, { 'trailing': false });
const key4Action = throttle(key4Pressed, 2000, { 'trailing': false });
const key5Action = throttle(key5Pressed, 2000, { 'trailing': false });

myStreamDeck.on('up', keyIndex => {
    console.log('key %d up', keyIndex);
    switch (keyIndex) {
        case 0:
            key0Action();
            break;
        case 1:
            key1Action();
            break;
        case 2:
            key2Action();
            break;
        case 3:
            key3Action();
            break;
        case 4:
            key4Action();
            break;
        case 5:
            key5Action();
            break;
        default:
            return;
    }
});

// Fired whenever an error is detected by the `node-hid` library.
// Always add a listener for this event! If you don't, errors will be silently dropped.
myStreamDeck.on('error', error => {
    console.error(error);
});

// Fill the first button form the left in the first row with a solid red color. This is synchronous.
// myStreamDeck.fillColor(4, 255, 0, 0);
// console.log('Successfully wrote a red square to key 4.');

// Fill the third button from the left in the first row with an image of the GitHub logo.
// See http://sharp.dimens.io/en/stable/ for full docs on this great library!



// const libmoji = require('libmoji');

// let avatarId = libmoji.getAvatarId("https://render.bitstrips.com/v2/cpanel/8968038-306434327_2-s1-v1.png?transparent=1&palette=1");

// const faceTemplate = '6972338';
// console.log(libmoji.buildCpanelUrl(faceTemplate,avatarId,1,1));

function init(cb) {
    console.log('init')
    loadPage('init');
    setTimeout(cb, 1000);
}

init(() => {
    loadPage('home');
})
