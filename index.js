// https://eco-website-one.vercel.app/

import { existing, wrong, reEnter } from './wrong.mjs'
import express from "express";
// import serverless from 'serverless-http';
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url"
import mongoose from "mongoose"
const __dirname = dirname(fileURLToPath(
  import.meta.url));

const app = express();
const port = process.env.PORT || 5500;

mongoose.connect("mongodb://127.0.0.1:27017/ECO", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});


const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body["email"] }).exec();
  if (user) {
    if (req.body["password"] == user.password)
      res.sendFile(__dirname + "/index.html");
    else
      res.send("WRONG PASSWORD");
  }
  else
    res.sendFile(__dirname + "/log/signlog.html");
})

app.post("/signup", async (req, res) => {
  const existing = await User.findOne({ email: req.body["email"] }).exec();
  if (existing) {
    res.send(`${existing}`);
  }
  else if (req.body["password"] == req.body["conf_password"]) {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    await newUser.save();
    res.sendFile(__dirname + "/index.html");
  }
  else {
    res.send("PASSWORDS DON'T MATCH");
  }
}
);

app.listen(port, () => {
  console.log(`${port}`);
})


