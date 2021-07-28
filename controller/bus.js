// const shortid = require('shortid');
// const Buses = require('../models/bus');

// const createBus = async (req, res) => {
//     const newBus = new Buses();
//     newBus.uid = shortid.generate();
//     newBus.busName = req.body.busName;
//     newBus.numberOfSeats = req.body.numberOfSeats;
    
//     try {
//         await newBus.save();
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
//     return res.status(201).json({ newBus });
// }

// // const resetAllTickets = async (req, res) => {
// //     const newBus = new Buses();
// //     newBus.uid = shortid.generate();
// //     newBus.busName = req.body.busName;
// //     newBus.numberOfSeats = req.body.numberOfSeats;
    
// //     try {
// //         await newBus.save();
// //     } catch (err) {
// //         return res.status(500).json({ message: err.message });
// //     }
// //     return res.status(201).json({ newBus });
// // }


// module.exports = {
//     createBus,
//     resetAllTickets
// };
