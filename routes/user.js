import express  from "express"; 
import * as userControllers from "../controllers/user.js";
import { authAdmin,authUser } from "../middlwares/auth.js";

const userRouter = express.Router();

userRouter.post("/",authUser,userControllers.addUser);
userRouter.post("/login",userControllers.userLogin);
userRouter.get("/",authAdmin,userControllers.getAllUsers);


export default userRouter;

