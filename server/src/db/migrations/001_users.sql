CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (email LIKE '%_@_%.__%'),
  username      TEXT NOT NULL UNIQUE COLLATE NOCASE CHECK (length(trim(username)) BETWEEN 1 AND 12),
  country       TEXT NOT NULL CHECK (country GLOB '[A-Z][A-Z]'),
  password_hash TEXT NOT NULL,
  admin         INTEGER NOT NULL DEFAULT 0 CHECK (admin IN (0, 1)),
  created_at    INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
) STRICT;
