const Notes = require('../models/Notes');

//addNotes
const addNotes = async (req, res) => {
    try {
        const {
            title,
            description,
            tag
        } = req.body;

        const newNote = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({  message: error.message  });
    }
}
//Read All Notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.send(notes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllNotes,
    addNotes
};

//Update A Note
const updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new Note
        const newNote = {};
        if(title) {
            newNote.title = title;
        }
        if(description) {
            newNote.description = description;
        }
        if(tag) {
            newNote.tag = tag;
        }
        // Find the note to be updated  
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Delete A Note
const deleteNote = async (req, res) => {
    try {
        // Find the note to be deleted and delete it  
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        // Allows deletion if user own this note
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "the Note has been deleted", note: note});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllNotes,
    addNotes,
    updateNote,
    deleteNote
};