const router = require('express').Router();
const {setUser } = require('../middleware/user');
const {createBus} = require('../controller/bus');

router.use(setUser);

//create bus
router.post('/', createBus);

module.exports = router;