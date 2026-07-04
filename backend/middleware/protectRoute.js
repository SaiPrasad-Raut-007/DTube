import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({error: "Unauthorized: No token provided"})
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({error: "Unauthorized: User not found"});
        }

        if (user.isBanned) {
            return res.status(403).json({error: "Access denied: Your account has been banned."});
        }

        req.user = decoded;
        req.user.role = user.role;

        next();
    } catch (error) {
        console.error("Auth Middleware Error: ", error.message);
        return res.status(401).json({error: "Unauthorized: Invalid or expired token"})
    }
}