import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
dotenv.config();
const app=express();
import userRoutes from "./routes/user.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import DbConnection from "./database/db.connection.js";
import http from "http";
import {Server} from 'socket.io'


DbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user',userRoutes);
app.use('/meeting',meetingRoutes);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("User connected", socket.id);
}).on('error', (err) => console.error(err));


app.get("/",(req,res) => {
    res.sendStatus(404);
});


server.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})