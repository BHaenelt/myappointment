# MyAppointment

A full stack appointment booking app built with Next.js and PostgreSQL. Patients can view upcoming appointments, book new ones, and delete them. I built this project to get hands-on with relational databases and SQL after spending most of my bootcamp working with MongoDB.

## Tech Stack

- Next.js 16 (App Router)
- React
- PostgreSQL
- Node.js

## Features

- View all appointments with patient name, doctor, specialty, date, and reason
- Book a new appointment using existing patients and doctors
- Delete an appointment
- Data pulled via a JOIN query across three related tables

## Getting Started

Clone the repo and install dependencies:
```bash
git clone https://github.com/BHaenelt/myAppointment.git
cd myAppointment
npm install
```

Create a `.env.local` file in the root with your database connection:
DATABASE_URL=your_postgresql_connection_string

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

This app uses three tables. Run the following in psql to set them up:
```sql
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100)
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  doctor_id INTEGER REFERENCES doctors(id),
  appointment_date DATE,
  reason TEXT
);
```

## Why I Built This

My two larger projects (ShiftSync and MediSchedule) both use MongoDB. I wanted to show I could work with relational databases too, so I built this app from scratch using PostgreSQL and raw SQL queries. The main GET endpoint uses a JOIN across all three tables to return full appointment details in a single query.

