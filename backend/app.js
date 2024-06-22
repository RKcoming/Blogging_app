const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const isAuth=require('./middleware/is-auth');

const app = express();


const MONGODB_URI =
"mongodb+srv://admin-rajesh:1234rk@cluster0.xmf5o.mongodb.net/twinng?retryWrites=true&w=majority"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    } else {
      cb(null, file.fieldname + "-" + uniqueSuffix);
    }
  },
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png'  || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(bodyParser.json());
app.use(multer({storage:storage,fileFilter:fileFilter}).single('image'));
app.use(authRoutes);
app.use(adminRoutes);
app.use('/images',express.static('images'));
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => {
    app.listen(8080, "localhost", () => {
      console.log("server is running at port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
