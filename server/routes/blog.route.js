import express from 'express';  
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, userBlogController } from '../controller/blog.controller.js';

const router = express.Router();

router.get('/all-blogs',getAllBlogsController)

router.get('/get-blog/:id',getBlogByIdController)

router.post('/create-blog',createBlogController)

router.put('/update-blog/:id',updateBlogController)

router.delete('/delete-blog/:id',deleteBlogController)

router.get("/user-blg/:id",userBlogController)

export default router;