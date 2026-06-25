import express from 'express';
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/dtube';
const app = express();

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



