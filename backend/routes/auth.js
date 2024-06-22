const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("username","username must be atleast three character long")
      .trim()
      .isLength({min:3}),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters long"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);
router.post('/signin',authController.signin);

module.exports = router;
