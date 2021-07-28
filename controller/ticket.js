const shortid = require('shortid');
const Tickets = require('../models/ticket');
const Buses = require('../models/bus');



const createBus = async (req, res) => {
    console.log("creating bus");
    const newBus = new Buses();
    newBus.uid = shortid.generate();
    newBus.owner = req.user;
    newBus.busName = req.body.busName;
    newBus.numberOfSeats = req.body.numberOfSeats;
    try {
        await newBus.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ newBus });
}


const createTicket = async (req, res) => {
    const newTicket = new Tickets();
    newTicket.uid = shortid.generate();
    newTicket.status = req.body.status;
    newTicket.owner = req.user;
    newTicket.bus = res.locals.bus;
    try {
        await newTicket.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ newTicket });
}


const updateTicket = async (req, res) => {
    res.locals.ticket.status = req.body.status ? req.body.status : res.locals.ticket.status;
    res.locals.ticket.owner = req.body.owner ? req.body.owner : req.user;
    try {
        await res.locals.ticket.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ updatedTicket: res.locals.ticket });
}


const getTicketUserDetails = async (req, res) => {
   
 console.log("getTicketUserDetails");
    let ticketFilter = [];
    if (req.params.ticketUid) {
        ticketFilter = [{ "uid": { $eq: req.params.ticketUid } }];
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

                    $match: {
                        $and: [
                            ...ticketFilter
                        ]
                    }

                },    
                {
                    $project: {
                        owner: 1,
                        _id: 0
                    }
                }
                // {
                //     $group: {
                //         _id: "$status",

                //     }
                // }
            ]
        )
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(getTicket);
}

const getTicketStatus = async (req, res) => {
    let ticketUidFilter =[];
    let ticketStatusFilter= [];
    if (req.query.ticketUid) {
        ticketUidFilter = [{ "uid": { $eq: req.query.ticketUid } }];
        console.log(ticketUidFilter);
    }
    if (req.query.tickeStatus) {
        ticketStatusFilter = [{ "status": { $eq: req.query.status } }];
    }
    let getTicket;
    try {
        getTicket = await Tickets.aggregate(
            [
                {

                    $match: {
                        $or: [
                            ...ticketUidFilter
                        ]

                    }

                }
               
            ])

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(getTicketStatus);
}

module.exports = {
    createTicket,
    createBus,
    updateTicket,
    getTicketStatus,
    getTicketUserDetails
};
