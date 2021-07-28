const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');

const createUser = async (req, res) => {
    const newUser = new Users();
    newUser.userName = req.body.userName;
    newUser.age = req.body.age;
    newUser.gender = req.body.gender;
    newUser.address = req.body.address;
    newUser.userType = req.body.userType;
    newUser.uid = shortid.generate();
    try {
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
    }
    catch (err) {
        return res.status(500).json({ "message": err.message });
    }
    const token = jwt.sign({ userName: newUser.userName }, process.env.SECRET);
    return res.status(201).json({ token });

}   

const loginUser = async (req, res) => {
    let user;
    let token;
    try {
        user = await Users.findOne({ userName: req.body.userName });
    } catch (err) {
        return res.status(500).json({'message': err.message});
    }
    if (user) {
        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (passwordMatch) {
            token = jwt.sign({ userName: user.userName , uid: user.uid}, process.env.SECRET); //for authorisation

        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } else {
        return res.status(404).json({ message: 'user not found' });
    }
    return res.status(201).json({ token });
}

module.exports = {
    createUser,
    loginUser
}