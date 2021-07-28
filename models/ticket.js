const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "open"
    },
    user: [{name: String, age: Number, gender: String}],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    bus: {
        type: mongoose.Types.ObjectId,
        ref: "bus"
    }
});

TicketSchema.pre("findOne", function (next) {
    this.populate("owner");
    next();
});

const ticket = mongoose.model('ticket', TicketSchema);

module.exports = ticket;