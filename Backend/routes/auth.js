const express=require('express')
const router=express.Router();
const User=require('./../models/User.js')
const {body, validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const {generateToken, jwtAuthMiddleware}=require('./../jwt.js')

router.post('/signup', [
    body('password','Password must be atleast 5 characters').isLength({min:5}),
    body('name','Username is required').notEmpty(),
    body('email','please enter a valid email').isEmail()
  ],
  async (req,res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, error: errors.array()[0].msg});
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry user with this email already exist"});
    }
  
    const salt = await bcrypt.genSalt(10);
    const secpas = await bcrypt.hash(req.body.password, salt);
  
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: secpas
      });
  
      const savedUser = await newUser.save();
  
      // Payload for token
      const data = {
        user: {
          id: savedUser.id
        }
      };
  
      // Generate token
      const authToken = generateToken(data);
  
      success = true;
      res.status(200).json({success, token: authToken});
  
    } catch(err) {
      console.error(err.message);
      res.status(500).json({error: 'Internal Server Error'});
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
