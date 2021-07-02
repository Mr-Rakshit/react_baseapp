const jwt = require("jsonwebtoken"); //library
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //verify and decode
    console.log(verifyToken);

    res.locals.token = token;
    res.locals.email = verifyToken.email;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};
module.exports = Authenticate;
