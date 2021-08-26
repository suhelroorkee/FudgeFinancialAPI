const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req, res, next ) => {
    try {
        Comment
        .find()
        .populate('user_id')
        .sort([['created_at',-1]])
        .exec(function (err, post) {
            if (err) return handleError(err);
            res.json(post);
        });
    } catch (err) {
        res.json({ message: err});
    }
});

router.post('/', async (req, res, next ) => {

    const post = await Post.findById(req.body.post_id);
    const user = await User.findById(req.body.user_id);
    console.log(post);
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        body: req.body.body
    });
    try {
        const savedComment = await comment.save();
        post.comments = post.comments.concat(savedComment)
        const savedComment1 = await post.save();
        user.comments = user.comments.concat(savedComment)
        const savedComment2 = await user.save();
        res.json(savedComment2);
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