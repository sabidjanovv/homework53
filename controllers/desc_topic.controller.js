const Desc_Topic = require("../schemas/Desc_Topic");

const addDescTopic = async (req, res) => {
  try {
    const descTopic = new Desc_Topic(req.body);
    await descTopic.save();
    res.status(201).send({ message: "Description Topic added", descTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescTopics = async (req, res) => {
  try {
    const descTopics = await Desc_Topic.find();
    res.status(200).send(descTopics);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const descTopic = await Desc_Topic.findById(id);
    if (!descTopic) {
      return res.status(404).send({ message: "Description Topic not found" });
    }
    res.status(200).send(descTopic);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const descTopic = await Desc_Topic.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Description Topic updated", descTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDescTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const descTopic = await Desc_Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "Description Topic deleted", descTopic });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDescTopic,
  getDescTopics,
  getDescTopicById,
  updateDescTopic,
  deleteDescTopic,
};
