import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verify0tp: { type: String, default: '' },
    verify0tpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    reset0tp: { type: String, default: '' },
    reset0tpExpireAt: { type: Number, default: 0 },
});

// Create the User model
const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

// Export the model
export default UserModel;