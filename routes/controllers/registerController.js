const db = require("../../database/index");
const bycrpt = require("bcrypt");
const { validationResult } = require("express-validator/check");
const axios = require("axios");
module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate Register
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    // Check if this is not a disposable email using validator pizza
    const isRealEmail = await axios.get(
      `https://www.validator.pizza/email/${email}`
    );
    const { data } = isRealEmail;
    if (!data.disposable) {
      // Generate Password
      const hash = await bycrpt.hash(password, 14);
      // Generate User
      const newUser = {
        username,
        email,
        hash,
        datecreated: new Date()
      };
      // Add User To The Database
      const addedUser = await db("users")
        .insert(newUser)
        .returning("*");
      return res.send(addedUser);
    } else {
      return res.status(400).json({ error: "Invalid Email Address" });
    }
  } catch (e) {
    console.log(e.message, req.body);
    return res.status(400).json({ error: e.message });
  }
};
