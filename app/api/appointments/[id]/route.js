import pool from "@/lib/db"

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    await pool.query("DELETE FROM appointments WHERE id = $1", [id])
    return Response.json({ message: "Deleted" })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
