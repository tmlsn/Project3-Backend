const express = require("express");
const Post = require('../models/Post.model');

const router = express.Router()

//create a post
router.post("/create-post", async (req, res) => {
    const { title } = req.body.title
    const { content } = req.body.content;
    const { createdAt } = new Date.now
    const { user } = req.jwtPayload.user._id
    const post = await Post.create({title, content, createdAt, user})
    res.status(200).json(post)
});

//get all posts from the user
router.get("/my-posts", async (req, res) => {
    const { user } = req.jwtPayload.user._id
    const myPosts = await Post.find({user : user});
    res.status(200).json(myPosts);
});

//get all posts
router.get("all-posts", async (req, res) => {
    const allPosts = await Post.find().populate('user');
    res.status(200).json(allPosts);
})