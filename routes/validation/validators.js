const { body } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
module.exports = {
  userValidate: [
    [
      body("email")
        .isEmail()
        .isLength({ max: 150 })
        .trim()
        .not()
        .isEmpty(),
      body("username")
        .isLength({ min: 2, max: 30 })
        .not()
        .isEmpty(),
      body("password")
        .isString()
        .trim()
        .matches(
          /^(?=[\040-\176]*?[A-Z])(?=[\040-\176]*?[a-z])(?=[\040-\176]*?[0-9])(?=[\040-\176]*?[#?!@$%)(_\.,+'"^&*-])[\040-\176]{8,72}$/
        ),
      sanitizeBody("*").toString()
    ]
  ],
  loginUserValidate: [
    body("email")
      .isEmail()
      .trim()
      .not()
      .isEmpty(),
    body("password")
      .isString()
      .trim()
      .matches(
        /^(?=[\040-\176]*?[A-Z])(?=[\040-\176]*?[a-z])(?=[\040-\176]*?[0-9])(?=[\040-\176]*?[#?!@$%)(_\.,+'"^&*-])[\040-\176]{8,72}$/
      ),
    sanitizeBody("*").toString()
  ],
  blogValidate: [
    body("title")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 30 }),
    body("body")
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 20, max: 4000 }),
    sanitizeBody("*").toString()
  ],
  sanitizer: [sanitizeBody("*").toString()]
};
