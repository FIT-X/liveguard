const path = require('path');
const sharp = require('sharp');
const request = require('request');
const libmoji = require('libmoji');
const { URL } = require('url');
const { createCanvas } = require('canvas');

function setLoading(myStreamDeck, index) {
    displayText(myStreamDeck, index, 'Loading...')
}

function displayText(myStreamDeck, index, text, font) {
    const canvas = createCanvas(72, 72);
    const ctx = canvas.getContext('2d');
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = font || '14px Impact';
    ctx.fillText(text, 12, 40);

    sharp(canvas.toBuffer())
        .flatten() // Eliminate alpha channel, if any.
        .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
        .then(buffer => {
            return myStreamDeck.fillImage(index, buffer);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayTemp(myStreamDeck, index, temp) {
    const canvas = createCanvas(72, 72);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.font = '30px Impact';
    ctx.fillText(`${temp} F`, 12, 50);

    sharp(canvas.toBuffer())
        .flatten() // Eliminate alpha channel, if any.
        .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
        .then(buffer => {
            return myStreamDeck.fillImage(index, buffer);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayTextSmall(myStreamDeck, index, temp) {
    const canvas = createCanvas(72, 72);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.font = '18px Impact';
    ctx.fillText(`${temp}`, 12, 40);

    sharp(canvas.toBuffer())
        .flatten() // Eliminate alpha channel, if any.
        .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
        .then(buffer => {
            return myStreamDeck.fillImage(index, buffer);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayMore(myStreamDeck, index, ) {
    const canvas = createCanvas(72, 72);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.font = '20px Impact';
    ctx.fillText(`More...`, 10, 40);

    sharp(canvas.toBuffer())
        .flatten() // Eliminate alpha channel, if any.
        .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
        .then(buffer => {
            return myStreamDeck.fillImage(index, buffer);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayBeachHacks(myStreamDeck, index) {
    displayImage(myStreamDeck, index, 'beachhacks.png')
}

function displayWeatherLogo(myStreamDeck, index) {
    displayImage(myStreamDeck, index, 'weather_logo.png')
}

function displayImage(myStreamDeck, index, filepath) {
    sharp(path.resolve(__dirname, 'assets', filepath))
        .flatten() // Eliminate alpha channel, if any.
        .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
        .then(buffer => {
            return myStreamDeck.fillImage(index, buffer);
        })
        .catch(err => {
            console.error(err);
        });
}

function getImageBuffer(fileUrl, cb) {
    const url = new URL(fileUrl);
    request.get({ url, encoding: null }, (err, resp, buffer) => {
        //process exif here
        cb(buffer);
    });
}

function drawRemoteImage(myStreamDeck, index, url) {
    getImageBuffer(url, (buffer) => {
        sharp(buffer)
            .flatten() // Eliminate alpha channel, if any.
            .resize(72, 72) // Scale up/down to the right size, cropping if necessary.
            .raw() // Give us uncompressed RGB.
            .toBuffer()
            .then(buffer => {
                return myStreamDeck.fillImage(index, buffer);
            })
            .catch(err => {
                console.error(err);
            });
    });
}

function drawBitmoji(myStreamDeck, index, avatarId) {
    const faceTemplate = '6972338';
    const url = libmoji.buildCpanelUrl(faceTemplate, avatarId, 1, 1);
    console.log(url);
    drawRemoteImage(myStreamDeck, index, url)
}

module.exports = {
    setLoading,
    displayText,
    displayTemp,
    displayTextSmall,
    displayBeachHacks,
    displayWeatherLogo,
    displayImage,
    displayMore,
    drawRemoteImage,
    drawBitmoji
};