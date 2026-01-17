import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import connectDB from './utils/db.js';
import { errorMiddleWare } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config({
    path: './.env'
});

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080;
const monogURI = process.env.MONGODB_URI
connectDB(monogURI);

app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});





app.use(errorMiddleWare)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
