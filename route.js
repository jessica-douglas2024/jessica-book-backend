const router = require('express').Router();
const Book = require('./model');

// 1. Get all books
router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// 2. Get single book by ID
router.get('/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) throw new Error('Book not found');
      res.json(book);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
});

// 3. Add /save a new book
router.post('/', async (req, res) => {
    const { bookTitle, bookAuthor, description } = req.body;
  
    try {
      const newBook = new Book({
        bookTitle,
        bookAuthor,
        description,
    });
  
    await newBook.save();
      res.json('Book added!');
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});
  
// 4-1. Update book by id (using post)
router.post('/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) throw new Error('Book not found');
  
      book.bookTitle = req.body.bookTitle;
      book.bookAuthor = req.body.bookAuthor;
      book.description = req.body.description;
  
      await book.save();
      res.json('Book updated!');
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

});
// 4-2. Update book by id (using put)
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error('Book not found');

    book.bookTitle = req.body.bookTitle;
    book.bookAuthor = req.body.bookAuthor;
    book.description = req.body.description;

    await book.save();
    res.json('Book updated!');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});
  
// 5. Delete book by id
router.delete('/:id', async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json('Book deleted.');
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});
  
  
  
module.exports = router;