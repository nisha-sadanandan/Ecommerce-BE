import  Product from "../model/productModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js"


 export const addProduct = async (req,res)=>{

  try {

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
  }
  cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.log(err, "error");
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
    
    const images = result.url;
    const body = req.body;
    console.log(body, "body");

    const { name,  price, quantity } = req.body;
    console.log(name)


    const newProduct = new Product({
         name,
         price,
         image:images,
         quantity
      });
    
    
    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      return res.send("product not added");
    }
    return res.send(savedProduct);
  });

} catch (error) {
  console.log("something went wrong", error);
  res.send("failed to add movie");

  }
}




export const getProduct = async(req,res)=>{
   try {
    
      const product = await Product.find();
      res.send(product).status(200)

   } catch (error) {
    
        console.log("something went wrong",error)
        res.send("failed to find product")
   }
}



