import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type:"String",
        required: [true, "Title is required"]
    },
    description:{
        type:"String",
        required: [true, "Description is required"]
    },
    image:{
        type:"String",
        required: [true, "Image is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    }
},{timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
