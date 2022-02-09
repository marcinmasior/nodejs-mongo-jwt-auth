const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { validateAuthParams } = require("../models/validation/auth.validation");
const { validateUserParams } = require("../models/validation/user.validation");
const { hashPassword, validPassword } = require("../utils/crypto");

const auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error } = validateAuthParams({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email or password is wrong" });
  }

  const validatedPassword = await validPassword(password, user.password);
  if (!validatedPassword) {
    return res.status(400).json({ error: "Email or password is wrong" });
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400000,
  });

  res.cookie("token", accessToken, {
    maxAge: 86400000,
    httpOnly: true,
  });
  res.json({ email });
};

const registration = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error } = validateUserParams({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json({ email: savedUser.email });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: "ok" });
};

module.exports = {
  auth,
  registration,
  logout,
};
