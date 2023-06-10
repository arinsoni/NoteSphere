const express = require('express');
const { getAllNotes, addNotes, updateNote, deleteNote, deleteOrphanedNotes } = require('../controllers/notes');
const verifyToken = require('../middleware/auth');
const Notes = require('../models/Notes');
const User = require('../models/User');


const router = express.Router();


router.use("/getAllNotes", verifyToken, getAllNotes);
router.use("/addNotes", verifyToken, addNotes);
router.use("/updateNote/:id", verifyToken, updateNote);
router.use("/deleteNote/:id", verifyToken, deleteNote);
router.delete('/deleteorphanednotes', deleteOrphanedNotes)

module.exports = router;
