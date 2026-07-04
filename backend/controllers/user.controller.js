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

export const getChannelProfile = async (req, res) => {
    try {
        
        const { id } = req.params;
        const channel = await User.findById(id);

        if (!channel) return res.status(404).json({error: "Channel not found"});

        res.status(200).json(channel);

    } catch (error) {
        res.status(500).json({error : "Server error fetching channel profile."})
    }
}

export const subscribe = async (req, res) => {
    try {
        const { channelId } = req.params;
        const subscriberId = req.user.id; 

        const channel = await User.findById(channelId);
        const subscriber = await User.findById(subscriberId);

        if (!channel || !subscriber) {
            return res.status(404).json({ error: "Channel or User not found." });
        }

        const isAlreadySubscribed = channel.subscribers.includes(subscriberId);

        if (isAlreadySubscribed) {
            await User.findByIdAndUpdate(channelId, {
                $pull: { subscribers: subscriberId }
            });
            await User.findByIdAndUpdate(subscriberId, {
                $pull: { subscribed_to: channelId } 
            });
            
            return res.status(200).json({ message: "Unsubscribed successfully." });
            
        } else {
            await User.findByIdAndUpdate(channelId, {
                $push: { subscribers: subscriberId }
            });
            await User.findByIdAndUpdate(subscriberId, {
                $push: { subscribed_to: channelId } 
            });
            
            return res.status(200).json({ message: "Subscribed successfully." });
        }

    } catch (error) {
        console.error("Error toggling subscription:", error);
        res.status(500).json({ error: "Server error subscribing to channel." });
    }
};

export const checkSubscriptionStatus = async (req, res) => {
    try {
        const { channelId } = req.params;
        const subscriberId = req.user.id; 

        const subscriber = await User.findById(subscriberId);

        if (!subscriber) {
            return res.status(404).json({ error: "User not found" });
        }

        const isSubbed = subscriber.subscribed_to.includes(channelId);

        res.status(200).json({ isSubscribed: isSubbed });

    } catch (error) {
        console.error("Error checking subscription status:", error);
        res.status(500).json({ error: "Server error checking status" });
    }
};

export const getSubscribedChannels = async (req, res) => {
    try {
        const userId = req.user.id;

        const subscriptions = await User.findById(userId)
            .populate("subscribed_to", "username user_pfp subscribers");
        
        res.status(200).json(subscriptions.subscribed_to);
    } catch (error) {
        res.status(500).json({error: "Server error fetching subscriptions"})
    }
}

export const getLikedVideos = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).populate({
            path: "liked_videos",
            populate: {
                path: "creator",
                select: "username user_pfp subscribers"
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.liked_videos);
    } catch (error) {
        console.error("Error fetching liked videos:", error);
        res.status(500).json({ error: "Server error fetching liked videos" });
    }
};

export const getWatchedVideos = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).populate({
            path: "watch_history",
            populate: {
                path: "creator",
                select: "username user_pfp subscribers"
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.watch_history);
    } catch (error) {
        console.error("Error fetching watched videos:", error);
        res.status(500).json({ error: "Server error fetching watched videos" });
    }
};

export const checkUserEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email : email})

        if (!user) {
            return res.status(404).json({error: "User with this email does not exist"});
        };

        req.targetUser = user;
        next();
    } catch (error) {
        console.error("Check email crash details: ", error);
        res.status(500).json({ error : 'Server error checking user email presence'});
    }
}