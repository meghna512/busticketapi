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
    numberOfSeats: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
});
BusSchema.pre("findOne", function (next) {
    this.populate("owner");
    next();
});


const bus = mongoose.model('bus', BusSchema);

module.exports = bus;