"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [appointments, setAppointments] = useState([])
  const [patient, setPatient] = useState("")
  const [doctor, setDoctor] = useState("")
  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")

  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data))
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleBook = async () => {
    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient, doctor, date, reason })
    })
    setPatient("")
    setDoctor("")
    setDate("")
    setReason("")
    fetchAppointments()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/appointments/${id}`, { method: "DELETE" })
    fetchAppointments()
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MyAppointment</h1>

      <h2>Book an Appointment</h2>
      <input placeholder="Patient name" value={patient} onChange={e => setPatient(e.target.value)} /><br />
      <input placeholder="Doctor name" value={doctor} onChange={e => setDoctor(e.target.value)} /><br />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br />
      <input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} /><br />
      <button onClick={handleBook}>Book</button>

      <h2>Appointments</h2>
      {appointments.map(a => (
        <div key={a.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Patient:</strong> {a.patient}</p>
          <p><strong>Doctor:</strong> {a.doctor} ({a.specialty})</p>
          <p><strong>Date:</strong> {new Date(a.appointment_date).toLocaleDateString()}</p>
          <p><strong>Reason:</strong> {a.reason}</p>
          <button onClick={() => handleDelete(a.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
