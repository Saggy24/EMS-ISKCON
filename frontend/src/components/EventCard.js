import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, formattedDate }) => {
      if (event.deleted_at) return null;

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p className="event-date">{formattedDate}</p>
      <p className="event-category">{event.category}</p>
      <p className="event-location">{event.location?.name}</p>
      <Link to={`/events/${event.id}`} className="btn view-details">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;