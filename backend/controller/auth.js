const User = require("../model/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  const data = req.body;

  User.findOne({ username: data.username })
    .then((user) => {
      if (!user) {
        bcrypt.hash(data.password, 10, function (err, hash) {
          if (err) {
            const err = new Error("Could not save");
            err.status = 500;
            throw err;
          }
          const newUser = new User({ username: data.username, password: hash });
          return newUser.save();
        });
      } else {
        let error = { status: 422, message: "User already exist" };
        throw error;
      }
    })
    .then((result) => {
      res.status(201).json({ message: "User saved succussfully" });
    })
    .catch((err) => {
      if (err.status) {
        res
          .status(err.status)
          .json({ title: "something went worng", message: err.message });
      } else {
        res
          .status(500)
          .json({ message: "Something went worng,we are working on it" });
      }
    });
};
exports.signin=(req,res,next)=>{
  const password=req.body.password;
  const username=req.body.username;
  let loadedUser;
  User.findOne({username:username}).then(user=>{
    if(!user){
      const error=new Error('Invalid username or password');
      error.status=401;
      throw error;
    }
    loadedUser=user;
    return bcrypt.compare(password,user.password);
  }).then(isEqual=>{
    if(!isEqual){
      const error=new Error('Invalid username or Password');
      error.status=401;
      throw error;
    }
    const token=jwt.sign({
      username:loadedUser.username,
      id:loadedUser._id.toString()
    },'thisIsRkSecret',{expiresIn:'1h'});
    res.status(200).json({token:token,id:loadedUser._id.toString()})
  }).catch(err=>{
      if(err.status){
        res.status(err.status).json({message:err.message})
      }else{
        res.status(500).json({message:'Something went worng!'})
      }
  })
}
