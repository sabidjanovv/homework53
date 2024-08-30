const express = require("express");
const {
  addDescTopic,
  getDescTopics,
  getDescTopicById,
  updateDescTopic,
  deleteDescTopic,
} = require("../controllers/desc_topic.controller");

const router = express.Router();

router.get("/", getDescTopics);
router.get("/:id", getDescTopicById);
router.post("/", addDescTopic);
router.put("/:id", updateDescTopic);
router.delete("/:id", deleteDescTopic);


module.exports = router;
