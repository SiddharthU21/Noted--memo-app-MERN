const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const {  body , validationResult  } = require('express-validator');  



// 1 : Getting all notes  using: GET "/api/notes/fetchallnotes"  required login.
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try{
    const notes = await Notes.find({ user : req.user.id })
    res.json(notes);
    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error');
    }    
})

// 2 : Add a new Note using: POST "/api/notes/addnote" requires login.
router.post('/addnote', fetchuser, [
    body('title',"Enter a valid title").isLength({ min : 5}),
    body('description','Description entered must be atleast 5 characters').isLength({ min : 5}),
] , async(req,res)=>{
    
    try{
    const {title , description , tag} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
        title , description , tag , user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote);
    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error');
    }    
})

// 3 : Updating existing note using: PUT "/api/notes/updatenote/:id"  required login.
router.put('/updatenote/:id', fetchuser, [
    //here put request is used as id is passed with url and it is accesed by params like req.params.id
    
] , async(req,res)=>{
    try{

        const {title , description , tag} = req.body;

        //create a newNotes object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the Note to be updated
        const note =  await Notes.findById(req.params.id)
        if(!note){res.status(404).send('Not found')}

        //note.user.toString() gives note id and we are veriying if the user is editing his notes only
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        // Usually when you perform update operations in mongoose, it returns the previous state of the document (before it was updated) and not the updated one. By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour
        
        const updatednote = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true})
        res.json({updatednote})

    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error');
    }    
})


// 4 : Delete existing note using: DELETE "/api/notes/deletenote:id"  required login.
router.delete('/deletenote/:id', fetchuser, [
    //here delete request is used as id is passed with url and it is accesed by params like req.params.id
    
] , async(req,res)=>{
    try{

        
        //find the Note to be deleted and delete it
        const note =  await Notes.findById(req.params.id)
        if(!note){res.status(404).send('Not found')}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        
        const deleteddnote = await Notes.findByIdAndDelete(req.params.id)

        res.json({"success":"Note has been deleted", "deletednote" : deleteddnote})

    }catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error');
    }    
})

module.exports = router