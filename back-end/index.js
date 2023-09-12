const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./Models/User");

const Jwt_Secret = "dksjdlkslddl;akndnkv";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ChatTest");

const jwtSecret = Jwt_Secret;

const bcryptSalt = bcrypt.genSaltSync(10);

async function getDataFromRequest(req) {
  const token = req.cookies?.token;
  if (!token) throw new Error("Access denied. No token provided.");
  try {
    const verified = jwt.verify(token, jwtSecret);
    const { userId, username } = verified;
    return { userId, username };
  } catch (err) {
    throw new Error("Invalid token.");
  }
}

// Test endpoint
app.get("/test", (req, res) => {
  res.send("This is a test endpoint");
});

// Profile endpoint
app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (!token)
    return res
      .status(401)
      .send("Access denied. You must be logged in to view this page.");
  try {
    const verified = jwt.verify(token, jwtSecret);
    res.json(verified);
  } catch (err) {
    res
      .status(401)
      .json({ error: "You need to be logged in to access this page." });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(
    ` the user with the username ${username} and the password ${password} is trying to register`
  );
  const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

  // create a new user
  try {
    const createdUser = await new User({
      username: username,
      password: hashedPassword,
    });
    await createdUser.save();
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            secure: true,
          })
          .status(201)
          .json({ id: createdUser._id });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // check if user exists
  try {
    const userFound = await User.findOne({ username: username });
    if (!userFound) return res.status(401).json("Wrong username or password");
    // check if password is correct
    const passwordMatch = bcrypt.compareSync(password, userFound.password);
    if (!passwordMatch)
      return res.status(401).json("Wrong username or password");
    // create a token
    jwt.sign(
      { userId: userFound._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json({ id: userFound._id });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3000");
});
