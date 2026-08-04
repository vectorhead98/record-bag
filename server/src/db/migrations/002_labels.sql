CREATE TABLE IF NOT EXISTS labels (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE CHECK (length(trim(name)) > 0),
  slug       TEXT NOT NULL UNIQUE CHECK (length(trim(slug)) > 0 AND slug GLOB '[a-z0-9-]*'),
  country    TEXT NOT NULL CHECK (country GLOB '[A-Z][A-Z]'),
  note       TEXT CHECK (note IS NULL OR length(trim(note)) > 0),
  cover_img  TEXT CHECK (cover_img IS NULL OR length(trim(cover_img)) > 0),
  parent_id  INTEGER REFERENCES labels(id) ON DELETE SET NULL CHECK (parent_id != id),
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE TABLE IF NOT EXISTS label_images (
  label_id INTEGER NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
  image    TEXT NOT NULL CHECK (length(trim(image)) > 0),
  PRIMARY KEY (label_id, image)
) STRICT;

CREATE TABLE IF NOT EXISTS label_links (
  label_id INTEGER NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
  site     TEXT NOT NULL CHECK (length(trim(site)) > 0),
  link     TEXT NOT NULL CHECK (length(trim(link)) > 0),
  PRIMARY KEY (label_id, site)
) STRICT;
