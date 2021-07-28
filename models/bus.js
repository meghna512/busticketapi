const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    busName: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true,
        min: 0,
        max: 40
    },
    availSeats: {
        type: Number,
        required: true,
        min: 0,
        max: 40,
        default: 40
    }
});

const bus = mongoose.model('bus', BusSchema);

module.exports = bus;