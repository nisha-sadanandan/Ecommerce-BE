import express from "express";
import upload from "../middleware/upload.js";

import { addProduct,getProduct} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.post("/add-product",upload.single("imageUrl"),addProduct);
productRouter.get("/get-product",getProduct)

export default productRouter
