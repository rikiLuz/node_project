import express from "express";
import * as orderControllers from "../controllers/order.js";
import { authAdmin, authUser } from "../middlwares/auth.js";

const orderRouter= express.Router();

orderRouter.get("/",authAdmin,orderControllers.getAllorders);
orderRouter.post("/",authUser,orderControllers.addOrder);
orderRouter.delete("/:id",authUser,orderControllers.deletOrder);
orderRouter.put("/:id",authAdmin,orderControllers.isShipped);
orderRouter.get("/byCustomerCod",authUser,orderControllers.getAllOrdersByCustomerCode);

export default orderRouter;


