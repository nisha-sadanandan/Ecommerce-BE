import express from "express";


import { addCartItem,getCartItems} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add-cart",addCartItem);
cartRouter.get("/get-cart",getCartItems)

export default cartRouter