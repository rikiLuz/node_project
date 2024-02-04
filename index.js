import express from "express";
import {config} from "dotenv";
import {connectToDb} from "./config/dbConfig.js"

import orderRouter from "./routes/order.js"
import sweetsRouter from "./routes/sweets.js";
import userRouter from "./routes/user.js";

config();
connectToDb();

const app=express();
app.use(express.json());

app.use("/api/users",userRouter);
app.use("api/orders",orderRouter);
app.use("/api/sweets", sweetsRouter);



let port=process.env.PORT||3500
app.listen(port,()=>{console.log(`app is listening on port: ${port}`)});