import roomModel from "../models/room.model.js";
import userModel from "../models/user.model.js";


export const RoomIsFull = async (roomId, email, socketId) => {
    try {
        console.log(roomId);
        const room = await roomModel.findOne({ meetingId: roomId });
        console.log(room);
        if (!room) {
            return true;
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return true;
        }

        // // Check if the user is already a participant
        // const existingParticipant = room.participants.find((participant) => participant.email === email);

        // if (existingParticipant) {
        //     // If participant is already in the room, update their socketId if necessary
        //     console.log(existingParticipant);
        //     if (existingParticipant.socketId !== socketId) {
        //         console.log("Updating socketId for existing participant");
        //         existingParticipant.socketId = socketId;
        //         await room.save();
        //         return false;
        //     }
        //     return false;
        // } else {
        //     // Add the new participant if there's space
        //     console.log(room.NumberOfParticipants);
        //     if (room.NumberOfParticipants >= 2) {
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }
        return false;

    } catch (error) {
        console.error(error);
        return { isFull: true, message: "An error occurred" };
    }
};

export const userJoinInRoom = async (socketId, userEmail, roomId) => {
    try {
        // Find the user by email
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return false;
        }

        // Check if the user is already a participant
        const existingRoom = await roomModel.findOne({
            meetingId: roomId,
            'participants.userId': user._id
        });

        if (existingRoom) {
            // User is already a participant, no update needed
            return existingRoom;
        }

        // Update the room by adding the participant
        const room = await roomModel.findOneAndUpdate(
            { meetingId: roomId },
            {
                $push: { participants: { socketId: socketId, email: userEmail, userId: user._id } },
                $inc: { NumberOfParticipants: 1 }
            },
            { new: true }
        );

        if (room) {
            await room.save();
            return room;
        }
        return false;

    } catch (err) {
        console.error(err);
        return false;
    }
};


export const RemoveFromRoom = async function(roomId,socketId){
    console.log(roomId,socketId);
    const room = await roomModel.findOne({meetingId: roomId});
    if(room){
        await roomModel.findByIdAndUpdate({meetingId:roomId}, {
            $pull: {participants: {socketId: socketId}},
            $inc: {NumberOfParticipants: -1}
        });
    }
}

