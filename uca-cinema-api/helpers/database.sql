CREATE DATABASE IF NOT EXISTS pelisdb;

USE pelis_db;


CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    hidden BOOLEAN DEFAULT FALSE
);
  
-- CREATE TABLE movies (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   description TEXT NOT NULL,
--   release_year INT,
--   director VARCHAR(255),
--   genre VARCHAR(255),
--   contact_information VARCHAR(255) NOT NULL,
--   price DECIMAL(10,2),
--   user_id INT NOT NULL,
--   creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   hidden BOOLEAN DEFAULT FALSE
-- );

-- Modelo de datos actualizado
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  genre VARCHAR(255),
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Agregar un campo hidden de tipo BOOLEAN a la tabla users
ALTER TABLE users ADD COLUMN hidden BOOLEAN DEFAULT FALSE;

INSERT INTO users (username, email, password, rol) VALUES
('Ricardo Sibrian', 'ricardo.sibrian@example.com', 'ricardo123', 'admin'),
('Carlos Portillo', 'carlos.portillo@example.com', 'carlos123', 'user'),
('Billy Valencia', 'billy.valencia@example.com', 'billy123', 'sysadmin');

-- Seed de datos para la tabla movies
INSERT INTO movies (title, description, genre)
VALUES
  ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Drama'),
  ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'Crime'),
  ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'Crime'),
  ('The Dark Knight', 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 'Action'),
  ('Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.', 'Drama');


-- INSERT INTO movies (title, description, release_year, director, genre, contact_information, price, user_id, creation_date) VALUES
-- ('Pelicula 1', 'Descripción de la película 1.', 2023, 'Director 1', 'Género 1', 'Contacto 1 - 555-1234', 10.00, 1, CURRENT_TIMESTAMP),
-- ('Pelicula 2', 'Descripción de la película 2.', 2023, 'Director 2', 'Género 2', 'Contacto 2 - contacto@example.com', 12.50, 2, CURRENT_TIMESTAMP),
-- ('Pelicula 3', 'Descripción de la película 3.', 2022, 'Director 3', 'Género 3', 'Contacto 3 - contacto@example.com', 8.00, 3, CURRENT_TIMESTAMP);
