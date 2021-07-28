const shortid = require('shortid');
const Tickets = require('../models/ticket');
const Buses = require('../models/bus');
const Users = require('../models/user');

const resetAllTickets = async (req, res) => {
    if (req.user.userType == "admin") {

        try {
            await Tickets.updateMany(
                {
                    bus: res.locals.bus._id
                },
                {
                $set: { "status": "open" }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    return res.status(201).json({ message: "Status updated to open" });
}

const createTicket = async (req, res) => {
    if (req.body.user) {
        if (req.body.user.length > res.locals.bus.availSeats) {
            return res.status(400).json({ message: "Not enough seats" });
        }
    }
    const newTicket = new Tickets();
    newTicket.uid = shortid.generate();
    newTicket.status = req.body.status;
    newTicket.user = req.body.user;
    newTicket.owner = req.user;
    newTicket.bus = res.locals.bus;
    try {
        await newTicket.save();
        res.locals.bus.availSeats -= req.body.user.length;
        await res.locals.bus.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ newTicket });
}


const updateTicket = async (req, res) => {
    if (req.body.user) {
        let userDiff = res.locals.ticket.user.length - req.body.user.length;
        if (userDiff > 0) {
            res.locals.bus.availSeats += userDiff;
        } else if (userDiff < 0) {
            res.locals.bus.availSeats -= userDiff;
        }
        res.locals.ticket.user = req.body.user;
    }

    if (req.body.status) {
        if (req.body.status == "close") {
            res.locals.bus.availSeats += res.locals.ticket.user.length;
        } else {
            if (res.locals.bus.availSeats >= res.locals.ticket.user.length) {
                res.locals.bus.availSeats -= res.locals.ticket.user.length;
            } else {
                return res.status(400).json({ message: "Not Enough Seats" });
            }
        }
        res.locals.ticket.status = req.body.status;
    }
    try {
        await res.locals.ticket.save();
        await res.locals.bus.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ updatedTicket: res.locals.ticket });
}


const getTicketUserDetails = async (req, res) => {
    let getUser;
    try {
        getUser = await Users.find({ _id: res.locals.ticket.owner });
        if (getUser.length == 0) {
            return res.status(404).json({ message: "User not found" });
        }
        if (getUser[0].uid != req.user.uid && req.user.userType != "admin") {
            return res.status(401).json({ message: "Unauthorised Access" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(...getUser);
}

const getTicketStatus = async (req, res) => {
    let ticketUidFilter = [];
    let ticketStatusFilter = [];
    if (req.query.ticketUid) {
        ticketUidFilter = [{ "uid": { $eq: req.query.ticketUid } }];
    }

    if (req.query.ticketStatus) {
        ticketStatusFilter = [{ "status": { $eq: req.query.ticketStatus } }];
    }

    let authorisationFilter = [{ $match: { "owner.uid": req.user.uid } }]
    if (req.user.userType == "admin") {
        authorisationFilter = [];
    }

    let getTicket;
    try {
        getTicket = await Tickets.aggregate(
            [
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $unwind: "$owner"
                },
                ...authorisationFilter,
                {
                    $match: {
                        $or: [
                            { uid: { $ne: null } },
                            ...ticketUidFilter,
                            ...ticketStatusFilter
                        ]
                    }
                }

            ])

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(getTicket);
}

module.exports = {
    createTicket,
    updateTicket,
    resetAllTickets,
    getTicketStatus,
    getTicketUserDetails
};
