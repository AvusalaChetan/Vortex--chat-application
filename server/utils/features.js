import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidV4 } from "uuid"
import { getBase64 } from "../lib/helper.js";

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  };
  return res.status(code).cookie("vortex-token", token, cookieOption).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
    },
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("emitting event", event, users);
}


const deletFilesFromcloudinary = async (public_ids) => {


}


const uploadFilesTocloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      console.log("Uploading file:", file.originalname, "Size:", file.size);
      cloudinary.uploader.upload(getBase64(file), {
        resource_type: "auto",
        folder: "vortex-chat-app",
        public_id: uuidV4(),
      }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        console.log("Upload successful:", result.public_id, result.secure_url);
        resolve(result)
      })
    })
  })

  try {
    const results = await Promise.all(uploadPromises);
    const fromattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }))
    console.log("Formatted results:", fromattedResults);
    return fromattedResults;
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    throw error;
  }

}




export { sendToken, emitEvent, deletFilesFromcloudinary, uploadFilesTocloudinary };
