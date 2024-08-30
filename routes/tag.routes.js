const express = require("express");
const {
  addTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

const router = express.Router();

router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", addTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
