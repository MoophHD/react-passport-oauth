const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method == "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(`decoded auth middleware: ${decoded}`)
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: "No authorisation" });
  }
};
