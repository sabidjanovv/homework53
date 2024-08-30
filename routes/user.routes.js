const express = require("express");
const {
  addUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();
const userPolice = require("../middleware/user_police");
const userRolesPolice = require("../middleware/user_roles_police");

router.get("/", userPolice, getUsers);
router.get("/:id", userPolice, userRolesPolice(["READ","WRITE"]), getUserById);
router.post("/register", addUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
