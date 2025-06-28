import express from 'express';
import { ConnectDB } from './DB/connectDB.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';


import authRoutes from './routes/auth.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
{app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));}
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
}
);