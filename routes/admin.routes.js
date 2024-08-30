const express = require("express");
const {
  createAdmin,
  adminLogin,
  adminLogout,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminActivate
} = require("../controllers/admin.controller");

const router = express.Router();
const adminPolice = require("../middleware/admin_police");
const adminRolesPolice = require("../middleware/admin_roles_police");


router.get("/:id", adminPolice,adminRolesPolice(["READ","WRITE", "DELETE"]), getAdminById);
router.get("/", adminPolice, getAdmins);
router.get("/activate/:link", adminActivate);
router.post("/", createAdmin);
router.post("/logout", adminLogout);
router.post("/login", adminLogin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
