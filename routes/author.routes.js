const express = require("express");
const {
  addAuthor,
  authorLogin,
  logoutAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  refreshToken,
  deleteAuthor,
  authorActivate,
} = require("../controllers/author.controller");

const router = express.Router();
const authorPolice = require("../middleware/author_police")
const authorRolesPolice = require("../middleware/author_roles_police")


router.get("/", authorPolice, getAuthors);
router.get("/:id", authorRolesPolice(["READ"]), getAuthorById);
router.get("/activate/:link", authorActivate);
router.post("/add", addAuthor);
router.post("/login", authorLogin);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshToken);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);



module.exports = router;
