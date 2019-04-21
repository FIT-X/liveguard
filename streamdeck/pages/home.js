const request = require("request");
const { setLoading,
    displayText,
    displayTemp,
    displayBeachHacks,
    displayWeatherLogo,
    displayImage,
    displayMore } = require('../utils');

const page = {
    0: {
        state: (myStreamDeck, key) => {
            setLoading(myStreamDeck, key);
            var options = {
                method: 'GET',
                url: 'http://api.worldweatheronline.com/premium/v1/marine.ashx',
                qs:
                {
                    q: '33.762065,-118.164219',
                    key: 'ff17dfd8204242d681544731192104',
                    format: 'json',
                    tp: '1',
                    tide: 'yes'
                },
                headers:
                {
                    'cache-control': 'no-cache'
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                body = JSON.parse(body);
                const forecast = body.data.weather[0].hourly[new Date().getHours()];
                console.log(forecast);
                displayTemp(myStreamDeck, key, forecast.tempF)

            });
        },
        action: (myStreamDeck, key) => {
           
        }
    },
    1: {
        state: (myStreamDeck, key) => {
            displayBeachHacks(myStreamDeck, key);
        },
        action: (myStreamDeck, key) => {
        }
    },
    2: {
        state: (myStreamDeck, key) => {
            displayImage(myStreamDeck, key, 'emergency.png')
        },
        action: (myStreamDeck, key) => {
        }
    },
    3: {
        state: (myStreamDeck, key) => {
            displayWeatherLogo(myStreamDeck, key);
        },
        action: (myStreamDeck, key, loadPage) => {
            loadPage('sensor');
        }
    },
    4: {
        state: (myStreamDeck, key) => {
            displayImage(myStreamDeck, key, 'surfer.png')
        },
        action: (myStreamDeck, key, loadPage) => {
            loadPage('surf');
        }
    },
    5: {
        state: (myStreamDeck, key) => {
            displayMore(myStreamDeck, key);
        },
        action: (myStreamDeck, key, loadPage) => {
            loadPage('more');
        }
    },
};

module.exports = {
    page
};