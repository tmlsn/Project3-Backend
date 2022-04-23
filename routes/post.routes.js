const express = require("express");
const Post = require('../models/Post.model');
const { authenticate } = require('../middlewares/jwt.middleware');

const router = express.Router()

//create a post
router.post("/create-post", authenticate, async (req, res) => {
    const { title, content } = req.body
    const { createdAt } = Date.now()
    /* const { user } = req.jwtPayload.user._id */
    const post = await Post.create({title, content, createdAt, user: req.jwtPayload.user._id})
    res.status(200).json(post)
});

//get all posts from the user
router.get("/my-posts", async (req, res) => {
    const { user } = req.jwtPayload.user._id
    const myPosts = await Post.find({user : user});
    res.status(200).json(myPosts);
});

//get all posts
router.get("/all-posts", async (req, res) => {
    const allPosts = await Post.find()/* .populate('user') */;
    res.status(200).json(allPosts);
});

// get one post by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  });
  
  // delete post by id
  router.delete("/:id", authenticate ,async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    const post = await Post.findById(id);
    console.log(post.user.toString(), req.jwtPayload.user._id)
    if (post.user.toString() === req.jwtPayload.user._id) {
      await Post.findByIdAndDelete(id);
      res.status(200).json(post);
    } else {
      res.status(400).json("unauthorized");
    }
  });
  
  // edit post by id
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    let post = await Post.findById(id);
    if (post.user.toString() === req.jwtPayload.user._id) {
      post.content = content;
      post.editedAt = Date.now()
      post = await Post.save();
      res.status(200).json(post);
    } else {
      res.status(400).json("unauthorized");
    }
  });

  //like a post by id
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.thumbsUp += 1
    post = await Post.save();
    res.status(200).json(post);
  });

  //unlike a post by id
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.thumbsUp -= 1
    post = await Post.save();
    res.status(200).json(post);
  });

  module.exports = router;