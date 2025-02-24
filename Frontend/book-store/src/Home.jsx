import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", publication_date: "", description: "" });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4500/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async () => {
    try {
      const response = await axios.post("http://localhost:4500/books", newBook);
      if (response.status === 201) {
        fetchBooks();
        setNewBook({ title: "", author: "", genre: "", publication_date: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (id) => {
    try {
      if (!editingBook) return;
      const response = await axios.put(`http://localhost:4500/books/${id}`, editingBook);
      if (response.status === 200) {
        fetchBooks();
        setEditingBook(null);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/books/${id}`);
      if (response.status === 200) {
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Book List</h1>

      <div style={styles.addBook}>
        <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} style={styles.input} />
        <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} style={styles.input} />
        <input type="text" placeholder="Genre" value={newBook.genre} onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })} style={styles.input} />
        <input type="date" placeholder="Publication Date" value={newBook.publication_date} onChange={(e) => setNewBook({ ...newBook, publication_date: e.target.value })} style={styles.input} />
        <textarea placeholder="Description" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} style={styles.textarea} />
        <button onClick={addBook} style={styles.button}>Add Book</button>
      </div>

      <div style={styles.bookList}>
        {books.map((book) => (
          <div style={styles.bookCard} key={book.id}>
            {editingBook && editingBook.id === book.id ? (
              <>
                <input type="text" value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} style={styles.input} />
                <input type="text" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} style={styles.input} />
                <input type="text" value={editingBook.genre} onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })} style={styles.input} />
                <input type="date" value={editingBook.publication_date} onChange={(e) => setEditingBook({ ...editingBook, publication_date: e.target.value })} style={styles.input} />
                <textarea value={editingBook.description} onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })} style={styles.textarea} />
                <button onClick={() => updateBook(book.id)} style={styles.button}>Save</button>
                <button onClick={() => setEditingBook(null)} style={styles.button}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre || "N/A"}</p>
                <p>Publication Date: {book.publication_date || "N/A"}</p>
                <p>Description: {book.description || "N/A"}</p>
                <button onClick={() => setEditingBook(book)} style={styles.button}>Edit</button>
                <button onClick={() => deleteBook(book.id)} style={styles.button}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  addBook: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "60px",
    marginBottom: "10px",
    padding: "8px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  bookList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  bookCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    width: "calc(30% - 20px)",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
};

export default Home;