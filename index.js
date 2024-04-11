// https://eco-website-one.vercel.app/

import ejs from "ejs";
import nodemailer from 'nodemailer';
import express from "express";
// import serverless from 'serverless-http;
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url"
import mongoose from "mongoose"
const __dirname = dirname(fileURLToPath(
  import.meta.url));

const app = express();
const port = process.env.PORT || 5500;
const senderMail = "ecoverse24@gmail.com";
const password = "qcxs lfxl iyfl witc";
let otp="";
let userEmail="";
let userPassword="";
// let userEnteredOtp="123456";

app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/ECO", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body["email"] }).exec();
  if (user) {
    if (req.body["password"] == user.password) {
      res.sendFile(__dirname + "/index.html");
    }
    else {
      res.render('index', {
        existingText: "",
        spanText: "Wrong Password!"
      });
    }
  }
  else
  {
    res.render('index', {
      existingText: "",
      spanText: "User doesn't exists! Please sign-up."
    });
  }
})



app.post("/signup", async (req, res) => {
  const existing = await User.findOne({ email: req.body["email"] }).exec();
  if (existing) {
    res.render('index', {
      spanText: "E-mail ID already registered. Please login",
    });
  }
  else if (req.body["password"] == req.body["conf_password"]) {
    userEmail = req.body.email;
    userPassword = req.body.password;

  // Generate a random OTP
  otp = Math.floor(100000 + Math.random() * 900000);

  // Send the OTP to the user's email address
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderMail,
      pass: password,
    },
  });

  const mailOptions = {
    from: senderMail,
    to: userEmail,
    subject: 'OTP for Email Verification',
    text: `Your OTP code is ${otp}.`,
  };

  await transporter.sendMail(mailOptions);
  res.render('otp',{spanText:"OTP succesfully sent!"});
}  else {
  res.send("PASSWORDS DON'T MATCH");
}
}
);

app.post("/OTP", async(req,res)=>{
  const userOTP = req.body.n1 + req.body.n2 + req.body.n3 + req.body.n4 + req.body.n5 + req.body.n6;
  if(userOTP == otp){
    const newUser = new User({
      email: userEmail,
      password: userPassword
    });
    await newUser.save();
    res.sendFile(__dirname + "/index.html");
  }
  else{
    res.render('otp',{spanText: "Incorrect OTP!"});
    }
});

app.listen(port, () => {
  console.log(`${port}`);
})




    
