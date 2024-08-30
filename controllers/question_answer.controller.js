const Question_Answer = require("../schemas/Question_Answer");

const addQuestionAnswer = async (req, res) => {
  try {
    const questionAnswer = new Question_Answer(req.body);
    await questionAnswer.save();
    res
      .status(201)
      .send({ message: "Question and Answer added", questionAnswer });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuestionAnswers = async (req, res) => {
  try {
    const questionAnswers = await Question_Answer.find();
    res.status(200).send(questionAnswers);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuestionAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const questionAnswer = await Question_Answer.findById(id);
    if (!questionAnswer) {
      return res.status(404).send({ message: "Question and Answer not found" });
    }
    res.status(200).send(questionAnswer);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const questionAnswer = await Question_Answer.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Question and Answer updated", questionAnswer });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const questionAnswer = await Question_Answer.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Question and Answer deleted", questionAnswer });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addQuestionAnswer,
  getQuestionAnswers,
  getQuestionAnswerById,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};
