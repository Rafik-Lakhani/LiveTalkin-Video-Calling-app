import mongoose from "mongoose";

const DbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Connection error', err));
};

export default DbConnection;