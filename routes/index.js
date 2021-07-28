const router = require('express').Router();
const ticketRoutes = require('./ticket');
//const busRoutes = require('./bus');
const userRoutes = require('./user');

router.use('/ticket', ticketRoutes);
//router.use('/bus', busRoutes);
router.use('/user', userRoutes);

module.exports = router;
