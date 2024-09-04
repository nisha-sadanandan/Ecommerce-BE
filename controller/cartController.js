import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js"

export const addCartItem = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      if (!productId || !quantity) {
        return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
      }
  
     
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      
      let cartItem = await Cart.findOne({ product: productId });
  
      if (cartItem) {
    
        cartItem.quantity += quantity;
      } else {
       
        cartItem = new Cart({
          product: productId,
          quantity: quantity
        });
      }
  
      await cartItem.save();
      res.status(200).json({ success: true, data: cartItem });
    } catch (error) {
      console.error('Error adding or updating cart item:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

  export const getCartItems = async (req, res) => {
    try {
      const cartItems = await Cart.find().populate('product');
      res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };