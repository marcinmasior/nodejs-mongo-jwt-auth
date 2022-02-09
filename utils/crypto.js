const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const passwordSalt = parseInt(process.env.PASSWORD_SALT || "10");
  const salt = await bcrypt.genSalt(passwordSalt);
  return bcrypt.hash(password, salt);
};

const validPassword = async (passwod, encryptedPassword) => {
  return bcrypt.compare(passwod, encryptedPassword);
};

module.exports = {
  hashPassword,
  validPassword,
};
