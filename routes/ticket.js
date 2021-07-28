const router = require('express').Router();
const {checkBus } = require('../middleware/bus');
const {checkTicket } = require('../middleware/ticket');
const {setUser } = require('../middleware/user');
const {createTicket, updateTicket,getTicketStatus,resetAllTickets,getTicketUserDetails} = require('../controller/ticket');

router.use(setUser);

//generate ticket
router.post('/:busUid', checkBus, createTicket);

//Details of person owning the ticket
router.get('/:busUid/ticket/:ticketUid', checkBus, checkTicket, getTicketUserDetails);

//view ticket status
router.get('/', getTicketStatus);

//reset all tickets
router.get('/:busUid/reset', checkBus, resetAllTickets);

//update ticket details
router.patch('/:busUid/ticket/:ticketUid', checkBus, checkTicket, updateTicket);


module.exports = router;