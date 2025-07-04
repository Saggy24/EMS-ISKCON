const db = require('../models');

const registerForEvent = async (req, res) => {
  try {
    const { id: event_id } = req.params;
    const user_id = req.user.id;

    // Validate event
    const event = await db.Event.findByPk(event_id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check existing registration
    const existingRegistration = await db.Registration.findOne({
      where: { user_id, event_id },
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Create registration
    const registration = await db.Registration.create({
      user_id,
      event_id,
      status: 'registered',
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const user_id = req.user.id;
    const registrations = await db.Registration.findAll({
      where: { user_id },
      include: [
        {
          model: db.Event,
          as: 'event',
          include: [{ model: db.Location, as: 'location' }],
        },
      ],
    });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerForEvent,
  getUserRegistrations,
};