import { Request,Response,NextFunction } from "express";
import User from "../models/User.js"
import { hash,compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export  const getAllUsers = async (
    req:Request, 
    res:Response,
    next:NextFunction
    )=>{
    //Get all users from Database
    try {
        const users = await User.find();
        return res.status(200).json({message:"Ok",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error", cause:error.message})
    }
}


export  const userLogin = async (
    req:Request, 
    res:Response,
    next:NextFunction
    )=>{
    //User Logiin

    try {
        const {email,password}=req.body;
        const user =  await User.findOne({email})
        if(!user){
            return res.status(401).send("User not registered")
        }
        //Verify Password
        const isPasswordCorrect=await compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password")
        }
        //Create token and store  it in cookie
        res.clearCookie(COOKIE_NAME,{domain:"localhost",path:'/',httpOnly:true,signed:true})

        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date()
        expires.setDate(expires.getDate()+7)
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});



        return res.status(200).json({message:"Ok",id:user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error", cause:error.message})
    }
}



export  const userSignUp = async (
    req:Request, 
    res:Response,
    next:NextFunction
    )=>{
    //User Sign up

    try {
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return  res.status(409).send("User already Exists")
        //encrypt the password
        const hashedPassword = await hash(password,10)

        //Creating a new user
        const user = new User({name,email,password:hashedPassword})
        await user.save()
        //Create token and store  it in cookie
        res.clearCookie(COOKIE_NAME,{domain:"localhost",path:'/',httpOnly:true,signed:true})

        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date()
        expires.setDate(expires.getDate()+7)
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});

        return res.status(201).json({message:"Ok",id:user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error", cause:error.message})
    }
}