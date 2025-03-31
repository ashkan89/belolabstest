const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

// Route to save game data
router.post('/save', memoryController.saveGameData);

// Route to fetch game records
router.get('/records', memoryController.fetchGameRecords);

module.exports = router;
