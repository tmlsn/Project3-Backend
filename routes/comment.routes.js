const express = require("express");
const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');

const { authenticate } = require('../middlewares/jwt.middleware');

const router = express.Router()

//create a comment
router.post("/add-comment/:postId", authenticate, async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params 
    /* const postcom = await Post.findById(postId) */
    const { createdAt } = Date.now()
    console.log( postId)
    /* const { user } = req.jwtPayload.user._id */
    const comment = await Comment.create({content, createdAt, user: req.jwtPayload.user._id, post: postId})
    res.status(200).json(comment)
});

// get all the comments for one post
router.get("/see-comments/:postId",authenticate, async (req, res) => {
  const { postId } = req.params;
  console.log(postId)
  const postComments = await Comment.find({post: postId})
  res.status(200).json(postComments);
})


  // delete comment by id
  router.delete("/delete-comment/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    console.log('ffffffffffffffffffffffffffffffffffff', id, comment)
    if (comment.user.toString() === req.jwtPayload.user._id) {
      await Comment.findByIdAndDelete(id);
      res.status(200).json(comment);
    } else {
      res.status(400).json("unauthorized");
    }
  });
  
  // edit comment by id
  router.put("/edit-comment/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    console.log('ffffffffffffffffffffffffffffffffffff', id)
    let comment = await Comment.findById(id);
    if (comment.user.toString() === req.jwtPayload.user._id) {
      comment.content = content;
      comment.editedAt = Date.now()
      comment = await comment.save();
      res.status(200).json(comment);
    } else {
      res.status(400).json("unauthorized");
    }
  });

  //like a comment by id
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    comment.thumbsUp += 1
    comment = await Comment.save();
    res.status(200).json(comment);
  });

  //unlike a comment by id
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    comment.thumbsUp -= 1
    comment = await Comment.save();
    res.status(200).json(comment);
  });

  module.exports = router;