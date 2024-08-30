const express = require("express");
const {
  addAuthorSocial,
  getAuthorSocials,
  getAuthorSocialById,
  updateAuthorSocial,
  deleteAuthorSocial,
} = require("../controllers/author_social.controller");

const router = express.Router();
router.get("/", getAuthorSocials);
router.get("/:id", getAuthorSocialById);
router.post("/", addAuthorSocial);
router.put("/:id", updateAuthorSocial);
router.delete("/:id", deleteAuthorSocial);

module.exports = router;
