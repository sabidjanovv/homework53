const Tag = require("../schemas/Tag");

const addTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).send({ message: "Tag added", tag });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).send(tags);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).send({ message: "Tag not found" });
    }
    res.status(200).send(tag);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({ message: "Tag updated", tag });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    res.status(200).send({ message: "Tag deleted", tag });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
};
