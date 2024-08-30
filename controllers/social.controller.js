const Social = require("../schemas/Social");
const { errorHandler } = require("../helpers/error_handler");

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;

    const newSocial = await Social.create({ social_name, social_icon_file });
    res.status(201).send({
      message: "Yangi ijtimoiy tarmoq qo'shildi",
      newSocial,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSocials = async (req, res) => {
  try {
    const socials = await Social.find({});
    res.send(socials);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSocialById = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);
    if (!social)
      return res.status(404).send({ message: "Ijtimoiy tarmoq topilmadi" });
    res.send(social);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const social = await Social.findByIdAndUpdate(
      req.params.id,
      { social_name, social_icon_file },
      { new: true }
    );

    if (!social)
      return res.status(404).send({ message: "Ijtimoiy tarmoq topilmadi" });

    res.send(social);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social)
      return res.status(404).send({ message: "Ijtimoiy tarmoq topilmadi" });
    res.send(social);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addSocial,
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
};
