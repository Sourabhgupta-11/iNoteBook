const mongoose=require('mongoose');

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,     //it tell mongoose that its type is id
        ref:'user'                               //it refers to user model
    },
    title:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notes=mongoose.model('Notes',notesSchema);
module.exports=Notes;