import  userModel from "../modals/userModel.js"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";

//Login Function
const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//Create a token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//REGISTER FUNCTION
const registerUser = async(req,res)=>{
    const {username,password,email} = req.body

    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User already exists"})
        }
        //Validation
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if(password.length < 8 ){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        
       //If everything works
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       //New User
       const newUser= new userModel({
        username:username,
        email:email,
        password:hashedPassword
       })
       const user = await newUser.save();
       const token = createToken(user._id)
       res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}