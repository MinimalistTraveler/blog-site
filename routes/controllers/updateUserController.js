const { body, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const db = require("../../database/index");

async function updatedUser(req, updatedItem, updateProperty) {
  try {
    const updateUser = await db("users")
      .where({ id: req.params.id })
      .update(updateProperty, updatedItem)
      .returning("*");
    return updateUser;
  } catch (e) {
    return { error: e.message };
  }
}

module.exports = async (req, res) => {
  const { updateWhich } = req.body;
  const { username, email, password } = req.body;
  if (updateWhich === "username") {
    // Validate Username
    const isValid = body("username")
      .isString()
      .isLength({ min: 2, max: 40 })
      .not()
      .isEmpty();
    const errors = validationResult(isValid);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const update = await updatedUser(req, username, "username");
    if (update.error) {
      console.log(e.message);
      return res.status(500).send({ error: "Internal Server Error." });
    }
    // The User would have to log back in for authorization.
    // Also delete the token with the old data from local storage
    return res.status(200).json(update);
  }
  if (updateWhich === "password") {
    // Validate Password
    const isValid = body("password")
      .isString()
      .trim()
      .matches(
        /^(?=[\040-\176]*?[A-Z])(?=[\040-\176]*?[a-z])(?=[\040-\176]*?[0-9])(?=[\040-\176]*?[#?!@$%)(_\.,+'"^&*-])[\040-\176]{8,72}$/
      );
    const errors = validationResult(isValid);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let hash = await bcrypt.hash(password, 14);
    const update = await updatedUser(req, hash, "hash");
    if (update.error) {
      console.log(e.message);
      return res.status(500).send({ error: "Internal Server Error." });
    }
    // The User would have to log back in for authorization.
    // Also delete the token with the old data from local storage
    return res.status(200).json(update);
  }
  if (updateWhich === "email") {
    // Validate Email
    const isValid = body("email")
      .isEmail()
      .trim()
      .not()
      .isEmpty();
    const errors = validationResult(isValid);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const update = await updatedUser(req, email, "email");
    if (update.error) {
      return res.status(500).send({ error: "Internal Server Error." });
    }
    // The User would have to log back in for authorization.
    // Also delete the token with the old data from local storage
    return res.status(200).json(update);
  }
  return res.status(400).send("Invalid Request");
};
