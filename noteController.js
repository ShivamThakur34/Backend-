const Note = require('../models/Note');
 // there is . before the /models remember if any problem
const asyncHandler = require("express-async-handler");

// Get all notes for logged-in user
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// Create a new note
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please provide title and content");
  }

  const note = await Note.create({
    title,
    content,
    user: req.user._id,
  });

  res.status(201).json(note);
});

// Get a note by ID
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.json(note);
});

// Update a note
const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Note not found");
  }

  note.title = title || note.title;
  note.content = content || note.content;

  const updatedNote = await note.save();
  res.json(updatedNote);
});

// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Note not found");
  }

  await note.deleteOne();
  res.json({ message: "Note deleted" });
});

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
