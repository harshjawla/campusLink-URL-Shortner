require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, Files } = require("../schemas/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");
const { Backend_URL, Frontend_URL, Backend_DOMAIN } = require("../config");

const saltRounds = 10;

router.get("/", (req, res) => {
  res.send("Working");
});

router.post("/user", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(200).json({ isAuth: 0 });
      } else {
        decoded.isAuth = 1;
        return res.status(200).json(decoded);
      }
    });
  } else {
    res.status(200).json({ isAuth: 0 });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const alreadyExist = await User.findOne({ username });
    if (alreadyExist) {
      return res.status(400).send("User already exists, please login");
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      const newUser = await User.create({
        username: username,
        password: hash,
      });

      if (newUser) {
        // Generate JWT token with user ID
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        console.log("JWT token generated successfully for user:", username); // Add logging statement
        // Set the JWT token as an HTTP-only cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          domain: Backend_DOMAIN,
        });
        res.status(200).json({ message: "Registration successful" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request for username:", username); // Add logging statement
  const user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error("Error occurred during password comparison:", err); // Add logging statement
        return res.status(500).json({ error: err });
      }
      if (result) {
        // Generate JWT token with user ID
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        console.log(
          "JWT token generated successfully for user:",
          user.username
        ); // Add logging statement
        // Set the JWT token as an HTTP-only cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          domain: Backend_DOMAIN,
        });
        res.status(200).json({ message: "Login successful" });
      } else {
        console.log("Invalid password for user:", user.username); // Add logging statement
        res.status(401).json({ message: "Invalid username or password" });
      }
    });
  } else {
    console.log("User not found:", username); // Add logging statement
    return res.status(400).send("User not registered");
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", " ", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      domain: Backend_DOMAIN,
    });
    return res.status(200).send("Logged Out Successfully");
  } catch (error) {
    console.error("Error Logging out", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/createfile", async (req, res) => {
  try {
    const { username, original_link, title } = req.body;

    const alreadyExist = await Files.findOne({
      username: username,
      title: title,
    });

    if (alreadyExist) {
      return res.status(400).json({
        message: "Title Already present, change the title and try again",
      });
    }

    const linkID = shortId.generate();

    const newLink = await Files.create({
      title: title,
      username: username,
      original_link: original_link,
      short_url: Backend_URL + "/" + linkID,
      linkID: linkID,
    });

    if (newLink) {
      res.status(200).json(newLink);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/userfiles", async (req, res) => {
  try {
    const { username } = req.body;
    const files = await Files.find({ username: username });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/deletefile", async (req, res) => {
  try {
    const { title, username, original_link, short_url } = req.body;
    const response = await Files.deleteOne({
      title: title,
      username: username,
      original_link: original_link,
      short_url: short_url,
    });
    res.status(200).json({ message: "Successfull" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:linkID", async (req, res) => {
  const linkID = req.params.linkID;
  const savedLink = await Files.findOne({ linkID });
  if (!savedLink) {
    return res.redirect(Frontend_URL + "/error");
  }
  savedLink.clicks++;
  await savedLink.save();
  let url = savedLink.original_link;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "//" + url;
  }
  res.redirect(url);
});

router.post("/searchfile",async (req,res)=>{
  try {
    const {linkID, username} = req.body;
    const file = await Files.findOne({linkID: linkID, username: username});

    if(file){
      res.status(200).json(file);
    } else{
      res.status(400).json({message: "Data not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.post("/editfile", async (req,res)=>{
  try {
    const {linkID, title, original_link, username} = req.body;
    const file = await Files.findOne({linkID: linkID});

    if(!file){
      return res.status(400).json({message: "Data not found!"});
    }

    file.title = "";

    await file.save();

    const anotherFile = await Files.findOne({username: username, title: title});

    if(anotherFile){
      return res.status(401).json({message: "Title must be unique"});
    }

    file.title = title;
    file.original_link = original_link;
    await file.save();

    return res.status(200).json({message: "success"});
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"});
  }
});

module.exports = router;
