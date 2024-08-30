const express = require("express");
const {
  addDescription,
  getDescriptions,
  getDescriptionById,
  updateDescription,
  deleteDescription,
} = require("../controllers/description.controller");
const router = express.Router();

router.get("/", getDescriptions);
router.get("/:id", getDescriptionById);
router.post("/", addDescription);
router.put("/:id", updateDescription);
router.delete("/:id", deleteDescription);

module.exports = router;
