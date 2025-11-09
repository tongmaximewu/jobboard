import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Database connection function
export async function openDb() {
  return open({
    filename: "./jobs.db", // SQLite database file
    driver: sqlite3.Database,
  });
}