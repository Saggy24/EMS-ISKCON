import React from 'react';
import { format } from 'date-fns';

const RegistrationList = ({ registrations }) => {
  if (!registrations || registrations.length === 0) {
    return <p>No registrations found.</p>;
  }

  return (
    <div className="registration-list">
      <h3>Your Event Registrations</h3>
      <div className="registrations-grid">
        {registrations.map(registration => (
          <div key={registration.id} className="registration-card">
            <div className="registration-header">
              <h4>{registration.event.title}</h4>
              <span className={`status-badge ${registration.status}`}>
                {registration.status}
              </span>
            </div>
            
            <div className="registration-details">
              <p>
                <strong>Date:</strong> {format(new Date(registration.event.date), 'MMM dd, yyyy')}
              </p>
              <p>
                <strong>Location:</strong> {registration.event.location.name}
              </p>
              <p>
                <strong>Registered on:</strong> {format(new Date(registration.registration_date), 'MMM dd, yyyy hh:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationList;