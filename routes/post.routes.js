const express = require("express");
const Post = require('../models/Post.model');
const { authenticate } = require('../middlewares/jwt.middleware');
const User = require("../models/User.model");

const router = express.Router()

//create a post
router.post("/create-post", authenticate, async (req, res) => {
    const { title, content } = req.body
    const { createdAt } = Date.now()
    const userId = req.jwtPayload.user._id
    const user = await User.findById(userId)
    const post = await Post.create({title, content, createdAt, user: user})
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
    const allPosts = await Post.find().populate('user') ;
    res.status(200).json(allPosts);
});

// get one post by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('user');
    console.log('ooooooooooooooooooooooooooooooooooo', post)
    res.status(200).json(post);
  });
  
  // delete post by id
  router.delete("/delete-post/:id", authenticate ,async (req, res) => {
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
  router.put("/edit-post/:id",authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const user  = req.jwtPayload.user._id
    let post = await Post.findById(id);
    if (post.user.toString() === req.jwtPayload.user._id) {
      post.title = title;
      post.content = content;
      post.editedAt = Date.now()
      post = await post.save();
      res.status(200).json(post);
    } else {
      res.status(400).json("unauthorized");
    }
  });

  /* //like a post by id
  router.put("/like-post/:id", authenticate, async (req, res) => {
    const { id } = req.params;
     const userId = req.jwtPayload.user._id 
   
    
    let post = await Post.findById(id);
    let user = await User.findById(userId)
    console.log(id, userId, post, user)
    
    post.likes.push(user._id)

    try {
      post = await post.save();
     res.status(200).json(post);
    } catch (error) {
       res.status(400).json("unauthorized"); 
      console.log(error)
    }
  });

  //unlike a post by id
    router.put("/unlike-post/:id",authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.jwtPayload.user._id
    let post = await Post.findById(id);
    let user = await User.findById(userId)
      post.likes.splice(post.likes.indexOf(user._id), 1)
      try {
        post = await post.save();
        
       res.status(200).json(post);
      } catch (error) {
         res.status(400).json("unauthorized"); 
        console.log(error)
      }
  });   */

  module.exports = router;