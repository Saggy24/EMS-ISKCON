const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

router.get('/', getAllEvents);
router.post('/', auth(['admin']), createEvent);
router.put('/:id', auth(['admin']), updateEvent);
router.delete('/:id', auth(['admin']), deleteEvent);

module.exports = router;