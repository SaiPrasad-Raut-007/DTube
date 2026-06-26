import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) return res.status(404).json({error: "User not found"});

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: "Server error fetching profile."})
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            {returnDocument: "after"}
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({error : "Server error updating profile"});
    }
}