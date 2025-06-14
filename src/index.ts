import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes"


const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());

app.get("/",(req , res )=>{
   res.send("Server is running");
});

app.use("/product", productRouter)
app.use("/user",userRouter)

// @ts-ignore
mongoose.connect(process.env.MONGODB_URI)
        .then(()=>console.log("MongoDB Connected"))
        .catch(err=>{console.log("MongoDB not connected",err)});

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log("Server is running on port ", PORT);
})
