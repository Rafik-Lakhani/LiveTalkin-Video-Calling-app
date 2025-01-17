import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    meetingId: {
        type: Number,
        required: true,
        unique: true
    },
    meetingName: {
        type: String,
        required: true
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: {
            type: String,
        },
        socketId: { type: String },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    NumberOfParticipants: {
        type: Number,
        default: 0,
        MaxSize: 2,
    }
});

roomSchema.statics.createRoomId = function () {
    return Math.floor(100000 + Math.random() * 900000);
}

export default mongoose.model('Room', roomSchema);
