const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  email: String,
  password: String,
  id: String,
});

model("User", UserSchema);
