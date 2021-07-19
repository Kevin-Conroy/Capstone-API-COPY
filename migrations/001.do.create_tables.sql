CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT,
  bandname TEXT,
  bio TEXT,
  pic_url VARCHAR
);

CREATE TABLE IF NOT EXISTS restaurants (
 id INTEGER,
 name TEXT NOT NULL,
 city TEXT NOT NULL,
 state TEXT NOT NULL,
 url VARCHAR,
 price VARCHAR
);

CREATE TABLE IF NOT EXISTS recommendations (
  id SERIAL,
  user_id INTEGER,
  restaurant_id INTEGER
);

CREATE TABLE IF NOT EXISTS bucket_list (
  id SERIAL,
  user_id INTEGER,
  restaurant_id INTEGER
);

