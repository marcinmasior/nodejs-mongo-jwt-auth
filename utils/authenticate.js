const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findOne({ _id: user._id }, "email");
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authenticate;
