const express = require("express");
const {
  addSynonym,
  getSynonyms,
  getSynonymById,
  updateSynonym,
  deleteSynonym,
} = require("../controllers/synonym.controller");

const router = express.Router();

router.get("/", getSynonyms); 
router.get("/:id", getSynonymById); 
router.post("/", addSynonym); 
router.put("/:id", updateSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
