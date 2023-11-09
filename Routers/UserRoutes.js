const express = require("express");
const UserController = require("./../Controller/UserHandaller");
const router = express.Router();

// ROUTES for User
router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createNewUser);
router
  .route("/:id")
  .get(UserController.getOneUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
