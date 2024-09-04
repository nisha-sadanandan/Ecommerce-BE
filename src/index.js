import express from "express";
import cors from "cors";
import { connect } from "../config/db.js";
import paymentRouter from "../routes/paymentRoutes.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";




const app = express()
app.use(cors())

app.use(express.json());


app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/cart",cartRouter)

const port = 3000;
connect();

app.get("/",(req,res)=>{

    res.send("Hello world");
})

app.listen(port,()=>{
    console.log(`app listening to the port ${port}`)
})