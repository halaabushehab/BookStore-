CREATE DATABASE book_catalog;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    publication_date DATE,
    description TEXT
);


-- INSERT INTO books (title, author, genre, publication_date, description)
-- VALUES 
-- ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', 'A novel set in the Roaring Twenties.'),
-- ('To Kill a Mockingbird', 'Harper Lee', 'Classic', '1960-07-11', 'A novel about racial injustice in the Deep South.'),
-- ('1984', 'George Orwell', 'Dystopian', '1949-06-08', 'A novel about a totalitarian regime and surveillance.');