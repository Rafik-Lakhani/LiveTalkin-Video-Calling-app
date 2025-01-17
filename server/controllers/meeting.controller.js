import roomModel from "../models/room.model.js";
import UserModel from "../models/user.model.js";

export const createMetting= async (req,res)=>{
    const {name,email}=req.query;
    if(!name || !email){
        return res.status(400).json({message: 'Name and email are required'});
    }
    const user=await UserModel.findOne({email:email});
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const roomId=roomModel.createRoomId();
    const room=await roomModel.create({
        meetingId:roomId,
        meetingName:name,
    });
    res.status(201).json({room:room, roomId:roomId});
};

export const joinMeeting = async (req,res)=>{
    const {roomId,email}=req.query;
    if(!roomId){
        return res.status(400).json({message: 'Meeting ID is required'});
    }
    const user=await UserModel.findOne({email:email});
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const room=await roomModel.findOne({meetingId:roomId});
    if(!room){
        return res.status(404).json({message: 'Meeting not found'});
    }
    if(room.NumberOfParticipants >= 2){
        return res.status(409).json({message: 'Meeting is full'});
    }
    res.status(200).json({room:room});
}