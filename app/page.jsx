"use client"

import { useState, useEffect } from "react"

export default function Home() {

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch("/api/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data))
  }, [])

  return (
    <div>
      <h1>Appointments</h1>
    </div>
  )

}