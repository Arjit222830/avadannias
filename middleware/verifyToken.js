const jwt = require("jsonwebtoken");
const config = require("config");

function verify(req, res, next) {
  const authHeader = req.cookies.name;
  console.log("authHeader--", req.cookies.name);
  if (authHeader) {
    jwt.verify(authHeader, config.get("secret"), (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      console.log("userhere--", user);
      req.user = user;
      console.log("req.user", req.user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
