const express = require("express");
const {
  addDescQA,
  getDescQAs,
  getDescQAById,
  updateDescQA,
  deleteDescQA,
} = require("../controllers/desc_QA.controller");

const router = express.Router();

router.get("/", getDescQAs);
router.get("/:id", getDescQAById);
router.post("/", addDescQA);
router.put("/:id", updateDescQA);
router.delete("/:id", deleteDescQA);

module.exports = router;
