import express, { urlencoded } from 'express';
import userRoute from './route/userRoute.js';
import eventRoute from './route/eventRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/dbconnection.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json(urlencoded({ extended: true })));

app.use("/user",userRoute);
app.use("event",eventRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
