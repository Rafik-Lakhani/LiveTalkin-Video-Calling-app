import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
import userRoutes from "./routes/user.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import DbConnection from "./database/db.connection.js";
import http from "http";
import { Server } from 'socket.io';
import {ExpressPeerServer} from 'peer';
import { RoomIsFull, userJoinInRoom, RemoveFromRoom } from "./services/room.service.js";

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
    debug: true
});
const io = new Server(server, {
    cors: {
        origin: `${process.env.FONTEND_URL}`,  // Replace with your frontend URL
        credentials: true,
    }
});
DbConnection();
app.use(cors(
    {
        origin: `${process.env.FONTEND_URL}`,  // Replace with your frontend URL
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/meeting', meetingRoutes);
app.use('/peerjs', peerServer);


io.on('connection', (socket) => {
    console.log("User connected", socket.id);
    socket.on("join-room", async ({roomId, userId,emailId}) => {
        socket.join(roomId);
        const room = await userJoinInRoom(socket.id,emailId,roomId);
        console.log(room);
        if(room==false) {
            socket.emit('something-went-wrong', { message: "Something went wrong" });
            return;
        }
        socket.emit('connection-done', { meetingName: room.meetingName});
        setTimeout(() => {
            socket.to(roomId).emit("user-connected", {userId: userId});
        }, 1000)

        socket.on("disconnect", () => {
            console.log("User Disconnected");
            io.emit("user-disconnected", userId)
        })
    });
}).on('error', (err) => console.error(err));


app.get("/", (req, res) => {
    res.sendStatus(404);
});


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})