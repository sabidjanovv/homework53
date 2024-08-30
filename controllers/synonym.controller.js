const Synonym = require("../schemas/Synonym");
const { errorHandler } = require("../helpers/error_handler");

const addSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;

    const newSynonym = await Synonym.create({ desc_id, dict_id });
    res.status(201).send({
      message: "Yangi sinonim qo'shildi",
      newSynonym,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSynonyms = async (req, res) => {
  try {
    const synonyms = await Synonym.find({});
    res.send(synonyms);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSynonymById = async (req, res) => {
  try {
    const synonym = await Synonym.findById(req.params.id);
    if (!synonym) return res.status(404).send({ message: "Sinonim topilmadi" });
    res.send(synonym);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    const synonym = await Synonym.findByIdAndUpdate(
      req.params.id,
      { desc_id, dict_id },
      { new: true }
    );

    if (!synonym) return res.status(404).send({ message: "Sinonim topilmadi" });

    res.send(synonym);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const synonym = await Synonym.findByIdAndDelete(req.params.id);
    if (!synonym) return res.status(404).send({ message: "Sinonim topilmadi" });
    res.send(synonym);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addSynonym,
  getSynonyms,
  getSynonymById,
  updateSynonym,
  deleteSynonym,
};
