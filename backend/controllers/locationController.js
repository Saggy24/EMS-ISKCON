const db = require('../models');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await db.Location.findAll();
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

// Add other location-related controller functions as needed
module.exports = exports;