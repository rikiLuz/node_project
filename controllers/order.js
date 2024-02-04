import mongoose from "mongoose";
import { OrderModel, orderValidator } from "../models/order.js";

const getAllorders = async (req, res) => {
    try {
        let allOrders = await OrderModel.find({});
        res.json(allOrders);
    } catch (err) {
        res.status(400).json({ type: "get error", massage: "cannot get all orders" })
    }
}


const addOrder = async (req, res) => {
    let { id } = req.body;
    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "valid error", massage: "not valid body" + validate.error.details[o].message })
    try {
        let sameOrder = await OrderModel.findById(id);
        if (sameOrder) {
            return res.status(400).json({ type: "same order", message: "there is a order with such Code" })
        }
        let customerCode= req.user._id;
        let newOrder = new OrderModel(req.body,customerCode);
        await newOrder.save();
        res.json(newOrder);
    } catch (err) {
        res.status(400).json({ type: 'post error', message: 'cannot add order' });
    }
}


const deletOrder = async (req, res) => {
    let { id } = req.params;
    let {_id}=req.user;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: 'not validate id', message: 'id is not valid' });
        let orderToDelete = await OrderModel.findById(id);
        if (!orderToDelete)
            return res.status(400).json({ type: " error", massage: "there is not a order with such Code" })
        if(_id!=order.customerCode && req.user.role!="admin")
            return res.status(403).json({ type: 'No match', message: 'You are not allowed to delete an order that you did not make' });
        if (orderToDelete.orderHasShipped == true)
            return res.json({ type: 'The order has gone out', message: 'The order has been sent, it cannot be deleted' });
        let order = await OrderModel.findByIdAndDelete(id);
        res.json(orderToDelete);
    } catch (err) {
        res.status(400).json({ type: 'delete error', message: 'cannot delete order' });

    }
}


const isShipped = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: 'not validate id', message: 'id is not valid' });
        let orderToShipped = await OrderModel.findById(id);
        if (!orderToShipped) {
            return res.json({ type: 'not found', message: 'there is no order with such id' });
        }
        if (orderToShipped.orderShipped == true) {
            return res.send("the order is shipped already")
        }
        orderToShipped.orderShipped = true;
        await orderToShipped.save();
        res.send("Order has been marked as shipped");
    }
    catch (err) {
        res.status(400).json({ type: "update shipping", message: err.message })
    }
}


const getAllOrdersByCustomerCode = async (req, res) => {
    let { _id,role } = req.user;
    if (role=='admin'&&req.body.customerCode)
    try {
        let allOrdersByCustomerCode = await OrderModel.find({customerCode:_id});
        if(!allOrdersByCustomerCode)
            return res.status(404).json({ type: "NOT FOUND", message: "this user don't have orders yet" });
        res.json(allOrdersByCustomerCode);
    }
    catch (err) {
        res.status(400).json({ type: 'get by customer code error', message: 'cannot get order by customer code' });
    }
}


export { getAllorders, addOrder, deletOrder, isShipped,getAllOrdersByCustomerCode};











