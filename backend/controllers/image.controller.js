export const uploadAvatar = async (req, res) => {
    try {

        const s3ImageUrl = req.file.location;

        res.status(200).json({
            message: "Profile picture updated successfully!",
            url: s3ImageUrl
        })

    } catch (error) {
        console.error("Avatar Upload Error: ", error);
        res.status(500).json({error: "Failed to upload image"});
    }
}

export const uploadBanner = async (req, res) => {
    try {
        
        const s3BannerUrl = req.file.location;

        res.status(200).json({
            message: "Channel Banner updated succesfully",
            url: s3BannerUrl
        });

    } catch (error) {
        console.error("Banner Upload Error: ", error);
        res.status(500).json({error : "Failed to upload banner image."})
    }
}

export const uploadThumbnail = async (req, res) => {
    try {
        
        const s3ThumbnailUrl = req.file.location;

        res.status(200).json({
            message: "Thumbnail updated successfully!",
            url: s3ThumbnailUrl
        });

    } catch (error) {
        console.error("Thumbnail Upload Error: ", error);
        res.status(500).json({error : "Failed to upload thumbnail image to S3"});
    }
}