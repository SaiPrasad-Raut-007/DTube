import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const removeVideoFromS3 = async (videoKey, thumbnailKey) => {
  try {
    const deleteVideoCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: videoKey,
    });
    await s3Client.send(deleteVideoCommand);

    const deleteThumbnailCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: thumbnailKey,
    });
    await s3Client.send(deleteThumbnailCommand);
  } catch (error) {
    console.error("Error occurred while deleting video from S3:", error);
    throw error;
  }
};
