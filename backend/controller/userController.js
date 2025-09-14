import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async(req, res) => {
    try {
        const { userName, password, email, isAdmin } = req.body;
        if ((!userName && !email) || !password || isAdmin === undefined) {
            return res.status(400).json({ message: "Username or email and password are required" });
        }
        const find= await User.findOne({ email:email });
        if (find) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hash= await bcrypt.hash(password,10);
        const user = new User({ userName, email, password: hash, isAdmin });
        await user.save();
        return res.status(201).json({ message: "User registered successfully" ,success:true});
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async(req, res) => {
 try {
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user= await User.findOne({email:email});
    if (!user) {
        return res.status(400).json({ message: "No user exists" })
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token=jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,   
  sameSite: "none"
});
    return res.status(200).json({ message: "Login successful", token });
 } catch (error) {
    console.log("error in login user",error);
    return res.status(500).json({ message: "Internal server error" });
 }
    
    }
export const checkAdmin=async(req,res)=>{
    return res.status(200).json({ isAdmin: req.user.isAdmin, success: true });
}
export const checkloggedIn=async(req,res)=>{
    return res.status(200).json({ userId: req.user.id, isAdmin: req.user.isAdmin, success: true });
}