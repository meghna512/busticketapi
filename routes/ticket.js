const router = require('express').Router();
const {checkBus,checkTicket } = require('../middleware/bus');
const {setUser } = require('../middleware/user');
const {createTicket, updateTicket,getTicketStatus,resetAllTickets,getTicketUserDetails} = require('../controller/ticket');
const {createBus} = require('../controller/bus');


router.use(setUser);

//generate bus
router.post('/bus', createBus);

//generate ticket
router.post('/:busUid', checkBus, createTicket);

router.get('/:busUid/ticket/:ticketUid', checkBus, checkTicket, getTicketUserDetails);

//view ticket status
router.get('/',  getTicketStatus);

//reset all tickets
router.get('/:busUid/reset', checkBus, resetAllTickets);

//update ticket details
router.patch('/:busUid/ticket/:ticketUid', checkBus, checkTicket, updateTicket);


module.exports = router;