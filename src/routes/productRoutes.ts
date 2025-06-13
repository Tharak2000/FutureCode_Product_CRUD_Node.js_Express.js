import express from "express";
import Product from "../model/product";

const router = express.Router();

router.get("/",async(req, res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(error){
        res.status(500).json({message:'Error finding Products',error})
    }
});

router.get("/:id",async(req, res)=>{
    const productId = await Product.findById(req.params.id);
    res.json(productId);
});

router.post("/",async(req, res)=>{
    try{
        console.log(req.body);
        const product = new Product(req.body);

        product.save()
            .then(r=> res.send(r))
            .catch(e=>res.send(e));
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error creating item"});
    }
});

router.put("/:id",async(req , res)=>{
    try{
        const id = req.params.id;
        const updateBody =  req.body;
        
        const updateProduct = await Product.findByIdAndUpdate(id, updateBody,{new:true})    
    
            if(!updateProduct){
                res.status(500).json({massege:"Product not found"});
                return;
            }
            res.status(200).json(req.body);

      }

    catch(error){
            console.log(error);
            res.status(500).json({message:"Error udating product",error});
    }
});

router.delete("/:id",async(req , res)=>{
    try{
        const id = req.params.id;
        const deleteProduct=await Product.findByIdAndDelete(id);

        if(!deleteProduct){
            res.status(500).json({message:"Item Not Found"});
        }

        res.status(200).json({message:"Product Deleted Successfully"});
    }

    catch(err){
        res.status(500).json({message:"Error when delete Product",err});
        console.log(err);
    }
})
    export default router;
