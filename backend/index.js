import express, { urlencoded } from 'express';
import userRoute from './route/userRoute.js';
import eventRoute from './route/eventRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/dbconnection.js';
import cookieParser from 'cookie-parser';


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept','X-User-Id'], 
    credentials:true}));
app.use(express.json(urlencoded({ extended: true })));
app.use(express.json());
app.use(cookieParser());

app.use("/user",userRoute);
app.use("/event",eventRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
