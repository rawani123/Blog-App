import mongoose from "mongoose"
import Blog from "../models/blog.model.js"
import User from "../models/user.model.js"

const getAllBlogsController=async(req,res)=>{
    try {
        const blogs = await Blog.find({})
        if(!blogs){
            return res.status(200).send({success: false, message: "No blogs found",blogCount:0, blogs:[]})
        }
        return res.status(200).send({success: true, message: "Blogs fetched successfully",blogCount:blogs.length, blogs})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}

const getBlogByIdController=async(req,res)=>{
    try {
        const {id}= req.params;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).send({success: false, message: "Blog not found"})
        }
        return res.status(200).send({success: true, message: "Blog fetched successfully", blog})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}

const createBlogController=async(req,res)=>{
    try {
        const {title,description,image,user} = req.body;
        if(!title || !description || !image || !user){
            return res.status(400).send({success: false, message: "Please provide all required fields"})
        }
        const existingUser = await User.findById(user);

        if(!existingUser){
            return res.status(404).send({success: false, message: "User not found"})
        }
        
        const blog = Blog({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        await blog.save();
        return res.status(201).send({success: true, message: "Blog created successfully",blog})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}

const updateBlogController=async(req,res)=>{
    try {
        const {id}= req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({success: true, message: "Blog updated successfully",updatedBlog})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}

const deleteBlogController=async(req,res)=>{
    try{
        const {id}= req.params;
        const blog = await Blog.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({success: true, message: "Blog deleted successfully"})
    }catch(error){
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}

const userBlogController=async(req,res)=>{
    try {
        const userBlog = await User.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({success: false, message: "User not found"})
        }
        return res.status(200).send({success: true, message: "User blogs fetched successfully",userBlog})
    } catch (error) {
        return res.status(500).send({success: false, message: "Internal server error",error: error.message})
    }
}


export {getAllBlogsController,getBlogByIdController,createBlogController,updateBlogController,deleteBlogController,userBlogController}