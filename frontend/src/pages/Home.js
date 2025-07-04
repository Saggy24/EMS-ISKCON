import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { format } from 'date-fns';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events', {
          params: { ...filters, page, limit: 5 },
        });
         const activeEvents = response.data.events.filter(
          event => event.deleted_at === null
        );
        
        setEvents(activeEvents);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, [page, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="home-page">
      <h1>Upcoming Events</h1>
      
      {user?.role === 'admin' && (
        <div className="admin-actions">
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      )}
      
      <FilterBar onFilter={handleFilter} />
      
      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              formattedDate={format(new Date(event.date), 'MMM dd, yyyy')}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;