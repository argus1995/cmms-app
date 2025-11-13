import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASEURL);

const connectDB = async () => {
  try {
    const response = await sql`SELECT version()`;
    const { version } = response[0];
    console.log(`Database connected: ${version}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { sql, connectDB };
