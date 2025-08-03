const express = require('express');
const {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected and require JWT token
router.route('/')
  .get(protect, getAllNotes)       // GET /api/notes
  .post(protect, createNote);      // POST /api/notes

router.route('/:id')
  .get(protect, getNoteById)       // GET /api/notes/:id
  .put(protect, updateNote)        // PUT /api/notes/:id
  .delete(protect, deleteNote);    // DELETE /api/notes/:id

module.exports = router;
