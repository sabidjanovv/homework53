const express = require("express");
const {
  addGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} = require("../controllers/guest.controller");

const router = express.Router();

router.get("/", getGuests);
router.get("/:id", getGuestById);
router.post("/", addGuest);
router.put("/:id", updateGuest);
router.delete("/:id", deleteGuest);

module.exports = router;
