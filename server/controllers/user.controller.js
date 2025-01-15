import UserModel from "../models/user.model.js";
import jwt from  'jsonwebtoken';

// Login API endpoint

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userFound=await UserModel.findOne({ email:email})
    if(!userFound){
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch=userFound.camparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token=await userFound.generateToken();
    
    res.cookie("token", token,{
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })

    res.status(200).json({ user: userFound, token });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please enter details"})
    }
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await UserModel.hashPassword(password);
    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });
    
    const token= await newUser.generateToken();
    res.cookie("token", token,{
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });

    res.status(201).json({ user: newUser, token });
};

export const logoutUser= async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully"});
};

export const getProfile = async (req, res)  => {
    const token = req.cookies.token || req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(userId.id);
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
};

