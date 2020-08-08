require("dotenv").config();

const express = require("express");
const passport = require("./passport");


const app = express();

app.use(express.json({ extended: true }));
app.use(passport.initialize());

app.get("/api/auth/github", (req, res) => {
  res.json({name: "test"})
})

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
