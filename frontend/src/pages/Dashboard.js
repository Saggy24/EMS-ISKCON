import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import EventForm from '../components/EventForm';
import DeleteModal from '../components/DeleteModal';
import { format, parseISO } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEvents();
      fetchLocations();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      console.log('Fetched events:', response.data); // Debugging
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events', error);
      setStatusMessage('Failed to load events');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await api.get('/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations', error);
      setStatusMessage('Failed to load locations');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleCreate = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      console.log('Created event response:', response.data); // Debugging
      
      // Ensure we have the full event object with ID
      const newEvent = response.data;
      
      // Add the new event to the state
      setEvents(prevEvents => [newEvent, ...prevEvents]);
      
      setShowForm(false);
      setStatusMessage('Event created successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error('Error creating event', error);
      setStatusMessage('Failed to create event: ' + error.message);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleUpdate = async (eventData) => {
    if (!editingEvent) return;
    
    try {
      const response = await api.put(`/events/${editingEvent.id}`, {
        ...eventData,
        location_id: Number(eventData.location_id)
      });
      
      const updatedEvent = response.data;
      
      // Update the event in the state
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      
      setShowForm(false);
      setEditingEvent(null);
      setStatusMessage('Event updated successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error('Error updating event', error);
      setStatusMessage('Failed to update event: ' + error.message);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
  try {
    await api.delete(`/events/${deleteEventId}`); // Use the delete method
    
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === deleteEventId ? {...event, deleted_at: new Date().toISOString()} : event
      )
    );
    
    setDeleteEventId(null);
    setStatusMessage('Event marked as deleted');
  } catch (error) {
    console.error('Delete error:', error.response?.data); // Detailed error
    setStatusMessage('Delete failed: ' + (error.response?.data?.message || error.message));
  }
};

  const prepareEventForEdit = (event) => {
    return {
      ...event,
      date: format(parseISO(event.date), 'yyyy-MM-dd'),
      location_id: event.location_id || event.location?.id
    };
  };

  if (user?.role !== 'admin') {
    return <div className="access-denied">Access denied. You must be an admin.</div>;
  }

  return (
    <div className="dashboard">
       <div className="dashboard-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Admin Dashboard</h1>
        
        <button 
          onClick={() => {
            setEditingEvent(null);
            setShowForm(true);
          }}
          className="btn create-btn"
          style={{
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            height: 'fit-content'
          }}
        >
          Create New Event
        </button>
      </div>
        {statusMessage && (
        <div className={`status-message ${
          statusMessage.includes('Failed') ? 'error' : 
          statusMessage.includes('deleted') ? 'warning' : 'success'
        }`}>
          {statusMessage}
        </div>
      )}
      
      {showForm && (
        <div className="event-form-modal">
          <div className="modal-content">
            <EventForm
              event={editingEvent ? prepareEventForEdit(editingEvent) : null}
              locations={locations}
              onSubmit={editingEvent ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            />
          </div>
        </div>
      )}
      
      <div className="events-list">
        <h2>Manage Events</h2>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <ul>
            {events.map(event => (
              <li key={event.id} className="event-item">
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>{event.date} | {event.category}</p>
                  <p>Location: {event.location?.name || 'Unknown'}</p>
                </div>
                <div className="event-actions">
                  <button 
                    onClick={() => {
                      setEditingEvent(event);
                      setShowForm(true);
                    }}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setDeleteEventId(event.id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <DeleteModal
        isOpen={!!deleteEventId}
        onClose={() => setDeleteEventId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;