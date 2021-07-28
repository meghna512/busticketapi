const Buses = require("../models/bus");

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

module.exports = {
    checkBus
}
