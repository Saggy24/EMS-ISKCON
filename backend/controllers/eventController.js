const db = require('../models');
const { Op } = require('sequelize');
const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 5, date, category, location } = req.query;
    const offset = (page - 1) * limit;

    const where = {
    };
    
    if (date) where.date = date;
    if (category) where.category = category;

    const include = [];
    if (location) {
      include.push({
        model: db.Location,
        as: 'location',
        where: { name: location },
      });
    } else {
      include.push({
        model: db.Location,
        as: 'location',
      });
    }

    const events = await db.Event.findAndCountAll({
       where: {
        [Op.and]: [
          where, 
          { deleted_at: null }  // Exclude soft-deleted records
        ]
      },
      include,
      limit: parseInt(limit),
      offset,
      order: [['date', 'ASC']]
    });

    res.json({
      total: events.count,
      pages: Math.ceil(events.count / limit),
      currentPage: parseInt(page),
      events: events.rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, category, location_id } = req.body;
    
    // Validate input
    if (!title || !description || !date || !category || !location_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const event = await db.Event.create({
      title,
      description,
      date,
      category,
      location_id,
      created_by: req.user.id,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, category, location_id } = req.body;

    const event = await db.Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.category = category || event.category;
    event.location_id = location_id || event.location_id;
    
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Soft delete using Sequelize's destroy method
    await event.destroy();
    
    res.json({ message: 'Event soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};