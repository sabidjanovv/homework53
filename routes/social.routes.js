const express = require("express");
const {
  addSocial,
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = express.Router();

router.get("/", getSocials);
router.get("/:id", getSocialById);
router.post("/", addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
