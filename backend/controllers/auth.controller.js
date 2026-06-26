import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { username, user_handle, email, password } = req.body;

        if (!username || !user_handle || !email || !password) {
            return res.status(400).json({error: "All fields are required."})
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { user_handle }]
        });

        if (existingUser) {
            return res.status(400).json({error : "Email or handle already in use."})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Please enter a valid email address."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const formattedName = username.split(" ").join("+");
        const dynamicAvatarUrl = `https://ui-avatars.com/api/?name=${formattedName}&background=30A645&color=000&size=256`;

        const newUser = new User({
            username,
            user_handle,
            email,
            password: hashedPassword,
            user_pfp: dynamicAvatarUrl
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                user_handle: newUser.user_handle,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({error: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "Invalid email or password"})
        }

        const token = jwt.sign(
            {id : user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        const { password: _, ...userData } = user._doc;

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: userData
        });

    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}