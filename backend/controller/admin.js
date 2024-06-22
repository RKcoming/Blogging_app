const Posts = require("../model/posts");
const { validationResult } = require("express-validator");
const fs = require('fs');
const { mongoose } = require("mongoose");
const path = require('path')
exports.addPost = async (req, res, next) => {

  const image = req.file;

  if (!image) {
    return res.status(422).json({ message: 'Please upload an image' })
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  const data = req.body;
  const imageUrl = image.path;
  // console.log(imageUrl);
  const post = new Posts({
    title: data.title,
    content: data.content,
    image: imageUrl,
    userId: req.userId,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({ message: "post saved", id: result._id });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Something went worng,we are working on it" });
    });
};

exports.getPosts = (req, res, next) => {
  Posts.find()
    .populate("userId")
    .then((posts) => {
      res.json({ posts: posts });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went worng" });
    });
};

exports.getSinglePost = (req, res, next) => {
  const id = req.params.id;
  Posts.findById(id)
    .then((post) => {
      res.json({ post: post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went worng" });
    });
};
exports.editPost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ message: error.array()[0].msg });
  }
  const id = req.params.id;
  const data = req.body;

  Posts.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(422).json({ message: "Could not find post" });
      }
      post.title = data.title;
      post.content = data.content;
      post.image = data.image;
      post
        .save()
        .then((result) => {
          res.status(201).json({ message: "Updated successfully" });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "something went worng!" });
    });
};

exports.deletePost = (req, res, next) => {    //images\image-1706445132620-353509001

  const id = req.params.id;
  Posts.findOneAndDelete({ _id: id }, (err, docs) => {
    if (err) {
      res.status(500).json({ message: "Something went worng!" });
      return;
    }
    fs.unlink(docs.image, (err) =>{
      if(err) {
        res.status(500).json({ message: "Something went worng!" });
        return;
      }
      res.json({ message: "deleted successfully" })
    });
  });

};
