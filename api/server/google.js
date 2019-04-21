
const gc = require('./gc.json');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({ credentials: gc });

async function isRiptide(url) {
    // Performs label detection on the image file
    const [result] = await client.labelDetection(url);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label));
    const wave = labels.find(label => {
        return label.description == 'Wave'
    });
    if (wave) {
        const calm = labels.find(label => {
            return label.description == 'Calm'
        });
        if (calm) {
            return calm.score < 0.72; // Riptide
        } else {
            return true; // Wave and no calm
        }
    }
    return false;
}

// isRiptide().then(riptide => {
//     console.log(riptide);
// })

module.exports = {
    isRiptide
}