const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// const getTokenFromHeaders = (req) => {
//   const {
//     headers: { authorization },
//   } = req;

//   if (authorization && authorization.split(" ")[0] === "Token") {
//     return authorization.split(" ")[1];
//   }
//   return null;
// };

// const auth = {
//   required: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders,
//   }),
//   optional: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders,
//     credentialsRequired: false,
//   }),
// };

router.get(
  "/user",
  (req, res) => {
    res.json(req.user);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect:"/",
    successRedirect: "/"
  }), (req, res) => {
    console.log(req.user);
  }
);


// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     failureRedirect:"/"
//   }),
//   (req, res) => {
//     res.json(req.user);
//   }
// );

module.exports = router;
