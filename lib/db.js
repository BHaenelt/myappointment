import { Pool } from "pg"

const pool = new Pool({
  user: "britt",
  database: "myappointment",
  host: "/var/run/postgresql",
  port: 5432,
})

export default pool
