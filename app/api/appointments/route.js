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

export async function POST(req) {
  try {
    const { patient, doctor, date, reason } = await req.json()
    const patientRes = await pool.query("SELECT id FROM patients WHERE name = $1", [patient])
    const doctorRes = await pool.query("SELECT id FROM doctors WHERE name = $1", [doctor])
    if (!patientRes.rows.length || !doctorRes.rows.length) {
      return Response.json({ error: "Patient or doctor not found" }, { status: 404 })
    }
    await pool.query(
      "INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason) VALUES ($1, $2, $3, $4)",
      [patientRes.rows[0].id, doctorRes.rows[0].id, date, reason]
    )
    return Response.json({ message: "Appointment booked" }, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
