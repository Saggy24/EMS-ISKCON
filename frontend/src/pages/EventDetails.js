import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventResponse = await api.get(`/events/${id}`);
        setEvent(eventResponse.data);
        
        if (user) {
          const registrationsResponse = await api.get('/events/registrations');
          const isReg = registrationsResponse.data.some(
            reg => reg.event_id === parseInt(id)
          );
          setIsRegistered(isReg);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleRegister = async () => {
    try {
      await api.post(`/events/${id}/register`);
      setIsRegistered(true);
      alert('Registered successfully!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <p className="event-meta">
        {format(new Date(event.date), 'MMMM dd, yyyy')} | {event.category}
      </p>
      <p className="event-location">
        Location: {event.location?.name}, {event.location?.city}
      </p>
      
      <div className="event-description">
        <p>{event.description}</p>
      </div>
      
      {user && (
        <div className="event-actions">
          {!isRegistered ? (
            <button onClick={handleRegister} className="btn register-btn">
              Register for Event
            </button>
          ) : (
            <p className="registered-msg">You are registered for this event</p>
          )}
        </div>
      )}
      
      {!user && (
        <p className="login-prompt">
          Please <a href="/login">login</a> to register for this event
        </p>
      )}
    </div>
  );
};

export default EventDetails;