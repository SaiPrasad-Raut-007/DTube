import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  try {
    const { username, user_handle, email, password } = req.body;

    if (!username || !user_handle || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { user_handle }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email or handle already in use." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
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
      user_pfp: dynamicAvatarUrl,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        user_handle: newUser.user_handle,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: userData,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const generateSecurityToken = async (req, res, next) => {
  try {
    const user = req.targetUser;

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    req.resetToken = resetToken;
    next();
  } catch (error) {
    console.error("Error is generating security token", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendResetMail = async (req, res) => {
  try {
    const user = req.targetUser;
    const token = req.resetToken;

    const clientUrl = process.env.CLIENT_URL;
    const resetLink = `${clientUrl}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DTube Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request - DTube",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f0f0f; color: #f1f1f1; padding: 30px; border-radius: 10px; border: 1px solid #303030;">
                    <h2 style="color: #f1f1f1; border-bottom: 1px solid #303030; padding-bottom: 10px;">Password Reset</h2>
                    <p style="color: #cccccc; font-size: 16px;">Hello ${user.username},</p>
                    <p style="color: #cccccc; font-size: 16px;">We received a request to reset your DTube password. Click the button below to set a new one:</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #30A645; color: #0f0f0f; padding: 14px 24px; text-decoration: none; border-radius: 18px; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>

                    <p style="color: #aaaaaa; font-size: 14px;">This link will expire in 15 minutes. If you did not request this, please ignore this email and your password will remain unchanged.</p>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset link sent to your mail id." });
  } catch (error) {
    console.error("Error in sending reset email", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT Verification Failed.", err.message);
      return res.status(400).json({
        error: "Invalid or expired reset token. Please request a new one.",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been successfully reset." });
  } catch {
    console.error("Error in reseting the password");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
