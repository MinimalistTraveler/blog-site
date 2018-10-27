const db = require("../../database/index");
const { validationResult } = require("express-validator/check");
const { JWT_SECRET } = require("../../config/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  const { email } = req.body;
  // Validate Register
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  // Find A User With The Results Given
  const foundedUser = await db("users")
    .select("*")
    .where("email", email)
    .returning("*");
  // If foundedUser returns empty, the user doesn't exist.
  if (JSON.stringify(foundedUser) === "[]") {
    return res.status(400).send({ error: "User does not exist" });
  }
  // Check Password
  const checkHash = await bcrypt.compare(
    req.body.password,
    foundedUser[0].hash
  );
  if (!checkHash) {
    return res.status(400).send({ error: "Invalid Username or Password" });
  }
  // Otherwise create a JWT token to be put into localStorage for authentication.
  const token = await jwt.sign(foundedUser[0], JWT_SECRET, { expiresIn: "2h" });
  return res.status(200).json({ token });
};
