# Event Management System

Full-stack application with React frontend, Node.js backend, and PostgreSQL database.

## Features
- User authentication (login/registration)
- Admin dashboard for event management
- Create, read, update, delete events
- Filter events by date/category/location

## Technologies
- Frontend: React, React Router, Axios
- Backend: Node.js, Express, Sequelize
- Database: PostgreSQL
- Authentication: JWT

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL v15+
- npm v9+
-------------------------------------------------------------------------------------
### Installation

1. Clone repository:
```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
---------------------------------------------------------------------------------------
## Database Setup

### 1. Create Database and User
```bash
sudo -u postgres psql -c "CREATE USER event_user WITH PASSWORD 'securepassword';"
sudo -u postgres psql -c "CREATE DATABASE event_db OWNER event_user;"

# Apply schema
psql -U event_user -d event_db -f database/schema.sql

# (Optional) Seed sample data
psql -U event_user -d event_db -f database/seed.sql
----------------------------------------------------------------------------------------
cd backend
npm install
cp .env.example .env  # Update values in .env
npx sequelize db:migrate
npx sequelize db:seed:all  # Optional: seed test data
npm start  # Runs on http://localhost:5000

----------------------------------------------------------------------------------------

cd frontend
npm install
cp .env.example .env  # Update REACT_APP_API_URL
npm start  # Runs on http://localhost:3000