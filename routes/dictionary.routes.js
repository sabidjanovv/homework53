const express = require("express");
const {
  addTerm,
  getDictionary,
  getDictionaryById,
  updateDictionary,
  deleteDictionary,
  getByLetter,
  getByTerm,
  getTermsByQuery,
} = require("../controllers/dictionary.controller");
const router = express.Router();

router.get("/", getDictionary);
router.get("/search", getTermsByQuery);
router.get("/:id", getDictionaryById);
router.get("/letter/:letter", getByLetter);
router.get("/term/:term", getByTerm);
router.post("/", addTerm);
router.put("/:id", updateDictionary);
router.delete("/:id", deleteDictionary);

module.exports = router;
