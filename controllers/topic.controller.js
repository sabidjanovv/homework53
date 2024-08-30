const Topic = require("../schemas/Topic");

const addTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).send({ message: "Topic added", topic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).send(topics);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).send({ message: "Topic not found" });
    }
    res.status(200).send(topic);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({ message: "Topic updated", topic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "Topic deleted", topic });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
};
