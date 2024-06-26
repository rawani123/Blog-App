import express from 'express';
import dotenv from 'dotenv';
import connectDB from './confid/db.js';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/user.route.js';
import blogRoutes from './routes/blog.route.js';


dotenv.config();

connectDB();

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/blog",blogRoutes)


app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
});