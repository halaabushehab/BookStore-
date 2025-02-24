require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const PORT = 4500;
const app = express();

app.use(express.json());
app.use(cors());

// استرجاع جميع الكتب
app.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE is_deleted = false');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// إضافة كتاب جديد
app.post('/books', async (req, res) => {
    try {
        const { title, author, genre, publication_date, description } = req.body;
        const result = await pool.query(
            "INSERT INTO books (title, author, genre, publication_date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, author, genre, publication_date, description]
        );
        res.status(201).json({ success: true, book: result.rows[0] }); // تأكيد نجاح العملية مع إرجاع الكتاب المضاف
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// تعديل بيانات كتاب
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publication_date, description } = req.body;
        const result = await pool.query(
            'UPDATE books SET title=$1, author=$2, genre=$3, publication_date=$4, description=$5 WHERE id=$6 RETURNING *',
            [title, author, genre, publication_date, description, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//deleted

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE books SET is_deleted = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ message: "Book soft deleted", book: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});












app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);

