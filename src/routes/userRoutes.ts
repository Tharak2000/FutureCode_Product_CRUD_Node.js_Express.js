import express from "express";
import User from "../model/user";

const router = express.Router();

router.post("/register",async (req , res)=>{
        try{
            const {username, password} = req.body;

            const existingUser = await User.findOne({ username });
            if(existingUser){
                res.status(500).json({message:"User already exist"});
            }

            const newUser = new User({username,password});
            await newUser.save();
            res.status(201).json({message:"User registered successfully"});
        }
        
        catch(error){
            res.status(500).json({message:"Registation faild",error})
        }
});

router.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
       const user= await User.findOne({username})

       if(!username){
        res.status(404).json({message:"User not found"})
       }

       if(user?.password != password){
        res.status(401).json({message:"Password Incorrect"});
       }

       res.status(200).json({message:"Login Successful",user});
        }

        catch(error){
            res.json(500).json({message:"Login faild",error})
        }

});

export default router;

