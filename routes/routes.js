const express = require("express");
const router = require("express-promise-router")();
// Validators
const {
  userValidate,
  loginUserValidate,
  blogValidate,
  sanitizer
} = require("./validation/validators");
// Authentication
const passport = require("passport");
const passportAuth = require("./authenticate/passport");
// User Controllers
const LoginController = require("./controllers/loginController");
const RegisterController = require("./controllers/registerController");
const UpdateUserController = require("./controllers/updateUserController");
const GetUserController = require("./controllers/getUserController");
const DeleteUserController = require("./controllers/deleteUserController");
// Blog Controllers
const GetUserBlogsController = require("./controllers/blogControllers/getBlogsController");
const GetBlogByIdController = require("./controllers/blogControllers/blogByIdContoller");
const AddUserBlogController = require("./controllers/blogControllers/addUserBlogController");
const UpdateBlogByIdController = require("./controllers/blogControllers/updateBlogById");
const DeleteBlogByIdController = require("./controllers/blogControllers/deleteBlogByIdController");
// /*
//     User CRUD
// _______________________________*/
// Login User
router.route("/signin").post(loginUserValidate, LoginController); // CHECK

// Register User
router.route("/register").post(userValidate, RegisterController); // CHECK

// Get The User By Token
router
  .route("/user")
  .get(passport.authenticate("jwt", { session: false }), GetUserController); // CHECK

// Update User By Token
router
  .route("/user/:id")
  .patch(
    passport.authenticate("jwt", { session: false }),
    sanitizer,
    UpdateUserController
  ); // CHECK

// Delete User By Token
router
  .route("/user/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    blogValidate,
    DeleteUserController
  ); // CHECK

//  TODO: Blog Posts
// /*
//     Blogs CRUD
// ___________________________________*/
// Get All The User Blogs
router
  .route("/blogs")
  .get(
    passport.authenticate("jwt", { session: false }),
    GetUserBlogsController
  ); // Check
// Add User's Blog
router
  .route("/blogs")
  .post(
    passport.authenticate("jwt", { session: false }),
    AddUserBlogController
  ); // CHECK
// // Get User's Blog By Id
router
  .route("/blogs/:id")
  .get(passport.authenticate("jwt", { session: false }), GetBlogByIdController); // CHECK

// // Update User's Blog By Id
router
  .route("/blogs/:id")
  .patch(
    passport.authenticate("jwt", { session: false }),
    blogValidate,
    UpdateBlogByIdController
  );
// CHECK

// // Delete User's Blogs
router
  .route("/blogs/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    DeleteBlogByIdController
  );
// CHECK
module.exports = router;
