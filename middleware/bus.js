const Buses = require("../models/bus");
const Tickets = require("../models/ticket");


const checkBus = async (req, res, next) => { 
    const busUid = req.params.busUid;
    let bus;
    try {
        bus = await Buses.findOne({ uid: busUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (bus) {
        res.locals.bus = bus; 
    } else {
        return res.status(404).json({ message: "Bus not found" });
    }
    return next();
}


const checkTicket = async (req, res, next) => { 
    const ticketUid = req.params.ticketUid;
    let ticket;
    try {
        ticket = await Tickets.findOne({ uid: ticketUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (ticket) {
        res.locals.ticket = ticket; 
    } else {
        return res.status(404).json({ message: "Ticket not found" });
    }
    return next();
}

module.exports = {
    checkBus,
    checkTicket
}
