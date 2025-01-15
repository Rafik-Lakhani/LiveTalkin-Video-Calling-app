import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.camparePassword = async function (password)  {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
}


userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const User = mongoose.model('User', userSchema);

export default User;