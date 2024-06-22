const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const { body } = require("express-validator");
const isAuth=require('../middleware/is-auth');

router.post(
  "/new",
  [
    body("title", "title must be at least three character long")
      .trim()
      .isString()
      .isLength({ min: 3 }),
    body("content", "content must be at least 5 character long")
      .trim()
      .isString()
      .isLength({ min: 5 }),
  ],isAuth,
  adminController.addPost
);
router.get("/", adminController.getPosts);
router.get("/post/:id",isAuth,adminController.getSinglePost);
router.patch(
  "/post/:id/edit",isAuth,
  [
    body("title", "title must be at least three character long")
      .trim()
      .isString()
      .isLength({ min: 3 }),
    body("content", "content must be at least 5 character long")
      .trim()
      .isString()
      .isLength({ min: 5 }),
  ],
  adminController.editPost
);

router.delete("/post/:id",isAuth, adminController.deletePost);
router.get('/djd',isAuth);

module.exports = router;
