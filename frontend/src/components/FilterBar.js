import React, { useState, useRef } from 'react';

const FilterBar = ({ onFilter }) => {
  const formRef = useRef(null);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filters = {
      date: formData.get('date'),
      category: formData.get('category'),
      location: formData.get('location')
    };
    
    // Count active filters
    const count = Object.values(filters).filter(val => val !== "").length;
    setActiveFilters(count);
    
    onFilter(filters);
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setActiveFilters(0);
      onFilter({ date: '', category: '', location: '' });
    }
  };

  return (
    <div className="filter-container">
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="filter-bar"
      >
        <div className="filter-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            className="filter-input"
          />
        </div>
        
        <div className="filter-group">
          <label>Category</label>
          <select name="category" className="filter-select">
            <option value="">All Categories</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            placeholder="Location name" 
            className="filter-input"
          />
        </div>
        
        <div className="filter-actions">
          <button 
            type="button" 
            onClick={handleReset}
            className="btn reset-btn"
            disabled={activeFilters === 0}
          >
            Clear Filters
          </button>
          <button 
            type="submit" 
            className="btn apply-btn"
          >
            Apply Filters
            {activeFilters > 0 && (
              <span className="filter-count">{activeFilters}</span>
            )}
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .filter-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }
        
        .filter-bar {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
          align-items: flex-end;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        label {
          font-weight: 500;
          margin-bottom: 8px;
          color: #495057;
          font-size: 14px;
        }
        
        .filter-input, .filter-select {
          padding: 10px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s;
          background-color: white;
        }
        
        .filter-input:focus, .filter-select:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .filter-actions {
          display: flex;
          gap: 10px;
          align-self: flex-end;
        }
        
        .btn {
          padding: 10px 16px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .apply-btn {
          background-color: #3498db;
          color: white;
          border: none;
        }
        
        .apply-btn:hover {
          background-color: #2980b9;
        }
        
        .reset-btn {
          background-color: transparent;
          color: #6c757d;
          border: 1px solid #dee2e6;
        }
        
        .reset-btn:hover {
          background-color: #f8f9fa;
          border-color: #ced4da;
        }
        
        .reset-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .filter-count {
          background-color: #e74c3c;
          color: white;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          margin-left: 8px;
        }
        
        @media (max-width: 768px) {
          .filter-bar {
            grid-template-columns: 1fr;
          }
          
          .filter-actions {
            width: 100%;
            margin-top: 10px;
          }
          
          .btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;