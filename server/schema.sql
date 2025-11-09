CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  date_posted DATETIME DEFAULT CURRENT_TIMESTAMP  -- Automatically set posting date
);