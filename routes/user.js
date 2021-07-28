const router = require('express').Router();
const {createUser, loginUser} = require('../controller/user');
const {validateUser} = require('../middleware/user');

//login
router.post('/login', validateUser, loginUser);

//signup
router.post('/signup', validateUser, createUser);

module.exports = router;    
