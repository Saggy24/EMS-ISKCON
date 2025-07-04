import React, { useState } from 'react';

const EventForm = ({ event, locations, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date || '');
  const [category, setCategory] = useState(event?.category || '');
  const [locationId, setLocationId] = useState(event?.location_id || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    if (!category) newErrors.category = 'Category is required';
    if (!locationId) newErrors.locationId = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({ 
      title, 
      description, 
      date, 
      category, 
      location_id: locationId 
    });
  };

  return (
    <div className="event-form-container">
      <h2>{event ? 'Edit Event' : 'Create New Event'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select Category</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
            <option value="Meetup">Meetup</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className={errors.locationId ? 'error' : ''}
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.city}
              </option>
            ))}
          </select>
          {errors.locationId && <span className="error-message">{errors.locationId}</span>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn primary">Save</button>
          <button type="button" onClick={onCancel} className="btn secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;