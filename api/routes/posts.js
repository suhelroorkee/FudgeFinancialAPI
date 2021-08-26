const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req, res, next ) => {
    try {
        Post
        .find()
        .populate('user_id')
        .populate({path: 'comments',populate: [{path: 'user_id', select: 'username'}],})
        .sort([['created_at', -1]])
        .exec(function (err, post) {
            if (err) return handleError(err);
            res.json(post);
        });
    } catch (err) {
        res.json({ message: err});
    }        
});

router.get('/all', async (req, res, next ) => {
    try {
        User.find()
    .populate('comments posts') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
        // handle err
        // usersDocuments formatted as desired
        res.json(usersDocuments);
    });
    } catch (error) {
        res.json({ message: err});
    }
});

router.post('/', async (req, res, next ) => {
    const user = await User.findById(req.body.user_id);
    const post = new Post({
        user_id: req.body.user_id,
        name: req.body.name,
        body: req.body.body
    });
    console.log(post);
    try {
        const savedPost = await post.save();
        user.posts = user.posts.concat(savedPost);
        const savedComment2 = await user.save();
        res.json(savedComment2);
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err});
    }
});

router.get('/:postId', (req, res, next ) => {
    res.status(200).json({
        message:'post details',
        post: req.params.postId
    });
});

router.delete('/:postId', (req, res, next ) => {
    res.status(200).json({
        message:'post deleted',
        postId: req.params.postId
    });
});
  module.exports = router;