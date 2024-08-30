const Author_Social = require("../schemas/Author_Social");

const addAuthorSocial = async (req, res) => {
  try {
    const authorSocial = new Author_Social(req.body);
    await authorSocial.save();
    res.status(201).send({ message: "Author Social added", authorSocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthorSocials = async (req, res) => {
  try {
    const authorSocials = await Author_Social.find();
    res.status(200).send(authorSocials);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthorSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const authorSocial = await Author_Social.findById(id);
    if (!authorSocial) {
      return res.status(404).send({ message: "Author Social not found" });
    }
    res.status(200).send(authorSocial);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAuthorSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const authorSocial = await Author_Social.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ message: "Author Social updated", authorSocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAuthorSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const authorSocial = await Author_Social.findByIdAndDelete(id);
    res.status(200).send({ message: "Author Social deleted", authorSocial });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthorSocial,
  getAuthorSocials,
  getAuthorSocialById,
  updateAuthorSocial,
  deleteAuthorSocial,
};