const Description = require("../schemas/Description");
const { errorHandler } = require("../helpers/error_handler");

const addDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;
    const desc = new Description({ category_id, description });
    await desc.save();
    res.status(201).send({ message: "Description added successfully", desc });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.find().populate("category_id");
    res.send(descriptions);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescriptionById = async (req, res) => {
  try {
    const description = await Description.findById(req.params.id).populate(
      "category_id"
    );
    if (!description)
      return res.status(404).send({ message: "Description not found" });
    res.send(description);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;
    const desc = await Description.findByIdAndUpdate(
      req.params.id,
      { category_id, description },
      { new: true }
    );
    if (!desc)
      return res.status(404).send({ message: "Description not found" });
    res.send(desc);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDescription = async (req, res) => {
  try {
    const description = await Description.findByIdAndDelete(req.params.id);
    if (!description)
      return res.status(404).send({ message: "Description not found" });
    res.send({ message: "Description deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDescription,
  getDescriptions,
  getDescriptionById,
  updateDescription,
  deleteDescription,
};
