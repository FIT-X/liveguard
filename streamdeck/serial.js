const EventEmitter = require('events');

const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')

const serialEmitter = new EventEmitter();

const port = new SerialPort('COM12', {
    baudRate: 115200
})
// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})
// Reading Data code

const parser = port.pipe(new Delimiter({ delimiter: '$' }))
parser.on('data', function (data) {
    // console.log(data.toString());
    parse(data.toString().trim());
}) // emits data after every '$'

function parse(data) {
    data = data.split('\n');
    data = data.reduce((acc, item) => {
        const parts = item.split(':');
        acc[parts[0]] = parts[1].replace('\r','');
        return acc;
    }, {})
    // console.log(data);
    serialEmitter.emit('data', data);
}

module.exports = {
    serialEmitter
}