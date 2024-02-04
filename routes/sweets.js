import express  from "express";
import * as sweetsControllers from "../controllers/sweets.js"
import { authAdmin } from "../middlwares/auth.js";

const sweetsRoter= express.Router();

sweetsRoter.get("/",sweetsControllers.getAllSweets);
sweetsRoter.get("/:id",sweetsControllers.getSweetsById);
sweetsRoter.put("/:id",authAdmin,sweetsControllers.updateSweet);
sweetsRoter.post("/",authAdmin,sweetsControllers.addSweet);
sweetsRoter.delete("/:id",authAdmin,sweetsControllers.deletSweet);

export default sweetsRoter;

