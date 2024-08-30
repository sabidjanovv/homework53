const express = require("express");
const {
  addQuestionAnswer,
  getQuestionAnswers,
  getQuestionAnswerById,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} = require("../controllers/question_answer.controller");

const router = express.Router();

router.get("/", getQuestionAnswers);
router.get("/:id", getQuestionAnswerById);
router.post("/", addQuestionAnswer);
router.put("/:id", updateQuestionAnswer);
router.delete("/:id", deleteQuestionAnswer);

module.exports = router;
