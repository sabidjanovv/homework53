const Guest = require("../schemas/Guest");

const addGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).send({ message: "Guest added", guest });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).send(guests);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findById(id);
    if (!guest) {
      return res.status(404).send({ message: "Guest not found" });
    }
    res.status(200).send(guest);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({ message: "Guest updated", guest });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByIdAndDelete(id);
    res.status(200).send({ message: "Guest deleted", guest });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
};
