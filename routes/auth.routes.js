const express = require("express");
const router = express.Router();
const authenticate = require("../utils/authenticate");
const { auth, registration, logout } = require("../controllers/auth.controller");

router.route("/login").post(auth).delete(logout);
router.route("/registration").post(registration);
router.route("/test").get(authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
