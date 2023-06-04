const express = require('express');
const { getAllNotes, addNotes, updateNote, deleteNote } = require('../controllers/notes');
const verifyToken = require('../middleware/auth')


const router = express.Router();


router.use("/getAllNotes", getAllNotes);
router.use("/addNotes", verifyToken, addNotes);
router.use("/updateNote/:id", verifyToken, updateNote);
router.use("/deleteNote/:id", verifyToken, deleteNote);

module.exports = router;
