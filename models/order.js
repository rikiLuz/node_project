import mongoose from "mongoose";
import Joi from "joi";


const minimalProduct =mongoose.Schema({
    productId:String,
    productName:String,
    amount:Number,
    imagePath:String,
    

})

const orderSchema =mongoose.Schema({
    // orderId:String,
    orderDate:{type:Date, default:Date.now()},
    deliveryDate:Date,
    customerAddress:String,
    customerCode:String,
    productsList:[minimalProduct],
    orderHasShipped:{type:Boolean, default:false}


})

export const OrderModel= mongoose.model("orders",orderSchema);

export const orderValidator = (_order) => {
    const schema = Joi.object({
    //    orderId: Joi.string().required(),
       orderDate: Joi.date(),
       deliveryDate: Joi.date().required(),
       customerAddress: Joi.string(),
       customerCode: Joi.string().min(9).max(9).pattern(new RegExp('^[0-9]$')).required(),
       productsList:Joi.array.items(minimalProductSchema).required(),
       orderHasShipped:Joi.boolean()
    });

    const minimalProductSchema= Joi.object({
        productId:Joi.string().required(),
        productName:Joi.string().required(),
        amount:Joi.number().required(),
        imagePath:Joi.string()

    });

    return schema.validate(_order);

}

export const orderModel=mongoose.model('orders',orderSchema);