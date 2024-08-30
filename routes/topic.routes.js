const express = require("express");
const {
  addTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

const router = express.Router();

router.get("/", getTopics);
router.get("/:id", getTopicById);
router.post("/", addTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
