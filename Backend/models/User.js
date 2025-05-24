const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true       
    },
    password:{
        required:true,
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(error){
        throw error;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User;