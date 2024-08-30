const Desc_QA = require("../schemas/Desc_QA");

const addDescQA = async (req, res) => {
  try {
    const descQA = new Desc_QA(req.body);
    await descQA.save();
    res.status(201).send({ message: "Description QA added", descQA });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescQAs = async (req, res) => {
  try {
    const descQAs = await Desc_QA.find();
    res.status(200).send(descQAs);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescQAById = async (req, res) => {
  try {
    const { id } = req.params;
    const descQA = await Desc_QA.findById(id);
    if (!descQA) {
      return res.status(404).send({ message: "Description QA not found" });
    }
    res.status(200).send(descQA);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescQA = async (req, res) => {
  try {
    const { id } = req.params;
    const descQA = await Desc_QA.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({ message: "Description QA updated", descQA });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDescQA = async (req, res) => {
  try {
    const { id } = req.params;
    const descQA = await Desc_QA.findByIdAndDelete(id);
    res.status(200).send({ message: "Description QA deleted", descQA });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDescQA,
  getDescQAs,
  getDescQAById,
  updateDescQA,
  deleteDescQA,
};
