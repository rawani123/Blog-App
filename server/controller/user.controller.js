import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send({success: false, message: "Please provide email and password"})
        }
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({success: false, message: "User not found"})
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({success: false, message: "Invalid credentials"})
        }
        return res.status(200).send({success: true, message: "User logged in successfully"})
    } catch (error) {
        console.log("Error in loginController: ", error.message);
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
};

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).send({success: false, message: "Please provide all required fields"})
        }
        // check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({success: false, message: "User already exists"})
        }
        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user
        const user = User({name, email, password: hashedPassword});
        await user.save();
        user.password = undefined;
        return res.status(201).send({success: true, message: "User created successfully",user})
    } catch (error) {
        console.log("Error in registerController: ", error.message);
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({success: true, message: "Users fetched successfully", users})
    } catch (error) {
        console.log("Error in getAllUsersController: ", error.message);
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
};


export { loginController, registerController, getAllUsersController };