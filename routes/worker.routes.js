const express = require('express');
const {
  addWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
} = require("../controllers/worker.controller");
const router = express.Router();



router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.post('/create', addWorker);
router.patch('/:id', updateWorker);
router.delete('/:id', deleteWorker);


module.exports = router;