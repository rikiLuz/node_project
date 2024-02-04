import mongoose from "mongoose";
import Joi from "joi";

const sweetSchema= mongoose.Schema({
    // sweetCode:Number,
    sweetName:String,
    sweetAmount:Number,
    sweetPrice:Number,
    sweetManuFacturingDate: Date,
    imgUrl:String

})

export const SweetModel = mongoose.model("sweet",sweetSchema);

export const sweetValidator = (sweet) => {
    const schema = Joi.object({
        // sweetCode: Joi.string().min(2).max(3).required(),
        sweetName: Joi.string().pattern(new RegExp(/[A-Za-z]+/)).required(),
       sweetPrice: Joi.number().min(1).required(),
        sweetMenueFactureDate: Joi.date(),
       sweetAmount: Joi.number(),
       imgUrl:Joi.string()
    });
    return schema.validate(sweet);

}

