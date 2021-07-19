BEGIN;

INSERT INTO profiles (first_name, last_name, username, bandname, bio, pic_url)
VALUES ('Kahaleel', 'Nitti', 'user1', 'Automated', 'Front-line multi-state contingency', 'https://www.fillmurray.com/200/300'),
('Sean', 'Halpeine', 'user2', 'contingency', 'Sharable intangible structure', 'https://www.fillmurray.com/200/301'),
('Adriano', 'Ferier', 'user3', 'Implemented', 'Synergistic multi-state function', 'https://www.fillmurray.com/200/301' ),
('Kevin', 'Conroy', 'user4', 'Dave Hause', 'A human being, I am', 'https://www.yelp.com' );

INSERT INTO restaurants (name, city, state, url, price)
VALUES ('Dynabox', 'Aurora', 'Colorado', 'https://google.com', '$'),
('Teklist', 'Paterson', 'New Jersey', 'https://yelp.com', '$$'),
('Oyope', 'Hartford', 'Connecticut', 'https://weather.com', '$$$$');

COMMIT;
