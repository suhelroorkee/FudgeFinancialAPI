const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// GET USERS
router.get('/', async (req, res, next ) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err});
    }
});

// POST USER
router.post('/', async (req, res, next ) => {
    const username = await User.find({username: req.body.username});
    const email = await User.find({email: req.body.email});
    const mobile = await User.find({mobile: req.body.mobile});

    if(username.length > 0) {
        res.json({message : 'Username already exist'});
        return;
    }
    if(email.length > 0) {
        res.json({message : 'Email already exist'});
        return;
    }
    if(mobile.length > 0) {
        res.json({message : 'Mobile already exist'});
        return;
    }
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile
    });
    try {
        await user.save();
        res.json({message : 'User Added Successfully'});
    } catch (err) {
        res.json({ message: err});
    }
});

// GET SPECIFIC USER
router.get('/:userid', async (req, res, next ) => {
    try {
        const user = await User.findById(req.params.userid);
        res.json(user);
    } catch (err) {
        res.json({ message: err});        
    }
});

// DELETE USER
router.delete('/:userid', async (req, res) => {
    console.log(req.params.userid);
    try {
        const removedUser = await User.remove({_id: req.params.userid});
        res.json(removedUser);
    } catch (error) {
        res.json({ message: err});         
    }

});

// UPDATE USER
router.put('/', async (req, res) => {
    console.log(req.body._id);
    console.log(req.body);
    try {
        const updatedUser = await User.updateOne(
            {_id: req.body._id},
            { $set: {firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, email: req.body.email, mobile: req.body.mobile},}
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: err});         
    }

});


module.exports = router;