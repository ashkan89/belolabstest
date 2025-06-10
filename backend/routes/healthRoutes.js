const express = require('express');
const { healthCheckController } = require('../controllers/healthCheckController');
const router = express.Router();

// Health check route
router.get('/healthcheck', healthCheckController);

module.exports = router;