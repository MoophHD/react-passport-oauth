require("dotenv").config();
require("./user.schema");

const express = require("express");
const passport = require("./passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("trust proxy", 1);

// Configurate our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));
app.use(passport.initialize());

// configure passport
require("./passport");

// Setting up routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.get("/login/success", (req, res) => {
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
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

const PORT = 3000;

const start = async () => {
  try {
    // Connect mongo
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // Models & routes
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (e) {
    console.log(`Error while starting the server, ${e}`);
  }
};

start();
