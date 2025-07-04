const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  registerForEvent,
  getUserRegistrations,
} = require('../controllers/registrationController');

router.post('/:id/register', auth(['user', 'admin']), registerForEvent);
router.get('/registrations', auth(['user', 'admin']), getUserRegistrations);

module.exports = router;