import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import generateMailTransporter from '../config/nodemailer.js';

//register
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending welcome email
        const transporter = generateMailTransporter(); // Fix: Call the function to get the transporter

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to MyFinanceMate',
            text: `Welcome to MyFinanceMate website! Your account has been created with email id: ${email}.`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "User registered successfully!" });

    } catch (err) {
        console.error(err.message);
        return res.json({ success: false, message: err.message });
    }
};
//login 
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
//logout 
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//send Verification OTP to User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account Already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyotp = otp;
        user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const transporter = generateMailTransporter(); // Create the transporter object

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your account verification code is: ${otp}.
Please enter this code on the website to complete your registration.
If you didn't request this, please ignore this message.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Your OTP has been sent. Check your email to verify your account." });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
//verify the Email using the OTP
export const verifiedEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check if OTP is empty or doesn't match
        if (user.verifyotp === '' || user.verifyotp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.verifyotpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        // Mark the user's email as verified
        user.isAccountVerified = true;
        user.verifyotp = ''; // Clear the OTP
        user.verifyotpExpireAt = 0; // Clear the expiration time

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
//check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//send password Reset OTP

export const sendResetotp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' })
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetotp = otp;
        user.resetotpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const transporter = generateMailTransporter(); // Create the transporter object

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}.Use this OTP to proceed with resetting your password.`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'OTP sent your email ' });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//Reset User Passwoed
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ sucess: false, message: 'Email,OTP,and new password are required' });
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check if OTP matches and is not expired
        if (user.resetotp === "" || user.resetotp !== otp) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (user.resetotpExpireAt < Date.now()) {
            return res.json({ success: false, message: ' expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword; // Ensure your UserModel hashes the password before saving
        user.resetotp = ''; // Clear the OT
        user.resetotpExpireAt = 0; // Clear the OTP expiration time
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}