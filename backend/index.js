import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/dtube';
const app = express();

app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Success... Connected to Database');

        app.listen(3000, () => {
            console.log('Server is running on port 3000!')
        });
    })
    .catch((err) => {
        console.log("Error connecting to the Database: ", err)
    })


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)