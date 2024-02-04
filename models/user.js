import mongoose, { Schema } from "mongoose";
import Joi from "joi";

let userSchema = mongoose.Schema({
    // userId: String,
    userName:String,
    email:String,
    password:String,
    role:{type:String, default: "user"},
    date:Date
})

export const User = mongoose.model("users", userSchema);

export const userValidator = (_user) =>{
    const schema= Joi.object({
        // userId:Joi.string().min(9).max(9).pattern(new RegExp('^[0-9]$')).required(),
        userName:Joi.string().pattern(new RegExp('^[a-zA-Z]$')).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('^[0-9a-zA-Z]{6,8}$')).required(),
        date:Joi.date().less('now'),
        role: Joi.string().valid('admin', 'user').insensitive()
    });
    return schema.validate(_user);
}

export const userValidatorForLogin = (_user) =>{
    const schema = Joi.object({
        userName:Joi.string().pattern(new RegExp('^[a-zA-Z]$')).required(),
        password:Joi.string().email().required()
    })
    return schema.validate(_user);
}
