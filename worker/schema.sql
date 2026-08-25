-- Schema for Melkazom Wedding RSVP & Messages
CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  attending TEXT NOT NULL,
  guest_count TEXT NOT NULL,
  meal_preference TEXT NOT NULL,
  song_request TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_rsvps_code ON rsvps(code);
CREATE INDEX IF NOT EXISTS idx_rsvps_created ON rsvps(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
