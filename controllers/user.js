import mongoose from "mongoose";
import {User, userValidator, userValidatorForLogin} from "../models/user.js";
import { hash,compare } from "bcrypt";
import { generateToken } from "../config/generateToken.js";


export const addUser = async (req,res) => {
    let validate = userValidator(req.body);
    if(validate.error)
        return res.status(400).json({type: "validate error",massege:validate.error.details[0].message});
    let {userName,email,password,date,role}=req.body;
    try{
        let sameUser = await User.findOne({$or:[{email:email},{userName,userName}]});
        if(sameUser)
            return res.status(409).json({type:"same user", massege:"there is a user with such id and name"});
        let hashedPassword= await hash(password,15);
        let newUser= new User({userName,email,password:hashedPassword,date,role});
        await newUser.save();
        let token= generateToken(newUser);
        res.json({token,userName});
    }catch(err){
        res.status(400).json({type:"error", massege:"התרחשה שגיאה בהוספת משתמש חדש"+err.massege});
    }
}


export const userLogin = async (req,res) =>{
    let validate= userValidatorForLogin(req.body);
    if(validate.error)
        return res.status(400).json({type: "validate error",massege:validate.error.details[0].message});
    let {userName,password}=req.body;
    try{
        let myUser= await User.findOne({userName:userName});
        if(!myUser|| !await compare(password,myUser.password))
           return res.status(404).json({type:"cannot login", massege:"לא קיים במערכת משתמש בעל שם כזה"});
        let token=generateToken(myUser);
        return res.json({token});
    }catch(err){
        res.status(400).json({type:"לא הצליח להתחבר למערכת",massege:"שגיאה בהתחברות"});
    }
  
}


export const getAllUsers = async (req,res) =>{
    try{
        const allUsers= await User.find({},"-password");
        res.json(allUsers);

    }catch(err){
        return res.status(400).json({type:"התרחשה שגיאה בקבלת הנתונים",massege:err.massege});
    }
}


