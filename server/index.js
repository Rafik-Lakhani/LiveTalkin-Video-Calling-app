import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
dotenv.config();
const app=express();
import userRoutes from "./routes/user.routes.js";
import DbConnection from "./database/db.connection.js";
DbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user',userRoutes);

app.get("/",(req,res) => {
    res.sendStatus(404);
});


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})