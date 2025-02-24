import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyotp: { type: String, default: '' },
    verifyotpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetotp: { type: String, default: '' },
    resetotpExpireAt: { type: Number, default: 0 },
});

// Create the User model
const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

// Export the model
export default UserModel;