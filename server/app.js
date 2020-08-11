require("dotenv").config();

const express = require("express");
const passport = require("./passport");
const path = require('path');

const app = express();

// const cors = require("cors");
// app.use(
//   cors({
//     origin: "http://localhost:3001", // allow server to accept request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// );

app.use(express.json({ extended: true }));
app.use(passport.initialize());

app.get("/test", (req, res) => {
  res.json({test: "test"});
})

app.get(
  "/api/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    console.log(`github callback`);
  }
);

app.get("/login/success", (req, res) => {
  console.log("login success");
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

app.get("/login/failed", (req, res) => {
  console.log("login failed");
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
