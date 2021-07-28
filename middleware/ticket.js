const Tickets = require("../models/ticket");

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
    checkTicket
}
