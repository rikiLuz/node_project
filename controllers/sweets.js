import mongoose from "mongoose";
import { SweetModel, sweetValidator } from "../models/sweets.js";

const getAllSweets = async (req,res) => {
    let {element}= req.query || 4;
    let {search}= req.query;
    let {perPage} =req.query ||15;

    let expression= new RegExp(`${search}`)
    
    try{
        let fillter={};
        if(search)
           fillter.name= expression;
        const allSweets = await SweetModel.find(fillter).skip((perPage-1)* element).limit(element);
        res.json(allSweets);
    }catch(err){
        res.status(400).json({ type: 'get error', message: 'cannot get all sweets' });
}
    
}


const getSweetsById = async (req,res) => {
    let {id}= req.params;
    try{
        if(!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: 'not validate id', message: 'id is not valid' });
        let sweet = await SweetModel.findById(id);
        if(!sweet)
          res.status(404).json({ type: 'not found', message: 'not found sweet with such id' });
        res.json(sweet);
    }catch(err){
        res.status(400).json({ type: 'get by id error', message: 'cannot get sweet' });
}  
}


const updateSweet = async (req,res) => {
    let {id}= req.params;
    let validate=sweetValidator(req.body);
    if(validate.error)
        return res.status(400).json({type:"error validate", massege:validate.error.details[0].message});
    try{
        if(!mongoose.isValidObjectId(id))
          return res.status(400).json({ type: 'not validate id', message: 'id is not valid' });
        let sweetToUpDate= await SweetModel.findById(id);
        if(!sweetToUpDate)
          return res.status(404).json({ type: 'not found', message: 'not found sweet with such id' });
        await SweetModel.findByIdAndUpDate(id, req.body);
        let sweet= await SweetModel.findById(id);
        res.json(sweet);
    }catch(err){
        res.status(400).json({ type: 'update error', message: 'cannot update sweet' });
    }
}

const deletSweet = async (req,res) => {
    let {id}= req.params;
    try{
        if(!mongoose.isValidObjectId(id))
          return res.status(400).json({ type: 'not validate id', message: 'id is not valid' });
        let sweetToDelete=await SweetModel.findByIdAndDelete(id);
        if(!sweetToDelete)
          res.status(404).json({ type: 'not found', message: 'not found sweet to delete with such id' });
        res.json(sweetToDelete);
    }catch(err){
        res.status(400).json({ type: 'delete error', message: 'cannot delete product' });
    }
}


 const addSweet = async (req, res) => {
    let { sweetName, sweetPrice, sweetMenueFactureDate, sweetAmount } = req.body;
    let validate = sweetValidator(req.body);
    if (validate.error) 
        return res.status(400).json({ type: "error validate", message: validate.error.details[0].message });

    try {
        let sameSweet = await SweetModel.findOne({ $or: [{ sweetCode: sweetCode }, { sweetName: sweetName }] });
        if (sameSweet) {
            return res.status(400).json({ type: "same sweet", message: "there is a sweet with such sweetCode" })
        }
        let newSweet = new SweetModel({ sweetCode, sweetName, sweetPrice, sweetMenueFactureDate, sweetAmount });
        await newSweet.save();
        res.json(newSweet);
    }
    catch (err) {
        res.json(err);
    }
}
    
export{getAllSweets,getSweetsById,deletSweet,updateSweet,addSweet};









