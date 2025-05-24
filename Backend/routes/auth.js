const express=require('express')
const router=express.Router();
const User=require('./../models/User.js')
const {body, validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const {generateToken, jwtAuthMiddleware}=require('./../jwt.js')

router.post('/signup',[
    body('password','Password must be atleast 5 characters').isLength({min:5}),
    body('name','Username is required').notEmpty(),
    body('email','please enter a valid email').isEmail()
    //custom Validator to check if username is already taken or not
    /*.custom(async (value)=>{
        const existingUser= await User.findOne({name:value})
        if(existingUser){
            throw new Error("Username already taken")
        }
        return true;
    })*/
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Sorry user with this email already exist"})
    }

    const salt=await bcrypt.genSalt(10);
    const secpas=await bcrypt.hash(req.body.password,salt)
    req.body.password=secpas;

    try{
        const data=req.body;
        const newUser=new User(data);
        const response=await newUser.save();
        console.log("data saved");
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.post('/login', async (req,res)=>{
    let success=false;
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({success,error: 'Invalid email or password'})
        }

        const payload={
            id: user.id,
            email: user.email
        }
        const token=generateToken(payload)
        success=true
        res.json({success,token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user;   //req.user contain decoded payload that we get from jwtAuthMiddleware
        const userId=userData.id;
        const user=await User.findById(userId).select("-password");
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/',async (req,res) =>{                                                                                                                                                                                                                                                                                                                     
    try{
        const data=await User.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({err:"Internal Server Error"})
    }
})

module.exports=router;
