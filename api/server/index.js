const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const morgan = require('morgan');

app.use(cors())
app.use(bodyparser.json());
app.use(morgan(':method :url :status - :response-time ms'));

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => res.send('Hello World!'));

// API here:

const google = require('./google');

app.post('/riptide', (req, res) => {
    const body = req.body;
    const imageUrl = body.imageUrl;
    console.log(body);
    google.isRiptide(imageUrl).then(hasRiptide => {
        res.send({ hasRiptide });
    })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));