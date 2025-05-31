const express=require('express')
const router=express.Router();
const Notes=require('./../models/Notes.js')
const {body, validationResult}=require('express-validator')
const {generateToken, jwtAuthMiddleware}=require('./../jwt.js')

router.post('/addNote',jwtAuthMiddleware,
    [
        body('title','Enter a Valid title').isLength({min: 3}),
        body('description','Description must be atleast 5 characters').isLength({min: 5})     
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()[0].msg})
        }

    try{
        const data=req.body;
        data.user=req.user.id;                   
        const newNotes=new Notes(data);
        const response=await newNotes.save();
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({err: 'Internal Server Error'})
    }
})

router.get('/',jwtAuthMiddleware,async (req,res) =>{                                                                                                                                                                                                                                                                                                                     
    try{
        const data=await Notes.find({user: req.user.id});
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({err:"Internal Server Error"})
    }
})

// routes/notes.js
router.get('/bytag/:tag', jwtAuthMiddleware, async (req, res) => {
  try {
    const tagRegex = new RegExp(`^${req.params.tag}$`, 'i'); // case-insensitive
    const notes = await Notes.find({ user: req.user.id, tag: tagRegex });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put('/updateNote/:id',jwtAuthMiddleware, async (req,res)=>{
    try{
    const noteId=req.params.id;
    const updatedData=req.body;

    const response=await Notes.findByIdAndUpdate(noteId,updatedData,{
        new: true,
        runValidators: true
    })
    if(!response){
        return res.status(404).json({error:"Notes not found"})
    }
    res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})

router.delete('/deleteNote/:id',jwtAuthMiddleware,async (req,res)=>{
    try{
        const noteId=req.params.id;
        const response=await Notes.findByIdAndDelete(noteId)
        if(!response){
        res.status(404).json({error:"Notes not found"})
        }
        res.status(200).json({"Success":"Notes has been deleted",response})
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports=router;