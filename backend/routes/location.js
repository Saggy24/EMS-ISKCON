const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getAllLocations } = require('../controllers/locationController');

router.get('/', getAllLocations);

module.exports = router;