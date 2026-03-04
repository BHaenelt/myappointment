import pool from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        appointments.id,
        patients.name AS patient,
        doctors.name AS doctor,
        doctors.specialty,
        appointments.appointment_date,
        appointments.reason
      FROM appointments
      JOIN patients ON appointments.patient_id = patients.id
      JOIN doctors ON appointments.doctor_id = doctors.id
      ORDER BY appointments.appointment_date ASC
    `)
    return Response.json(result.rows)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}