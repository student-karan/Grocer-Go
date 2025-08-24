import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import "dotenv/config";
import { CloudinaryParams } from "./types";


export async function connectCloudinary() {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "GrocerGo",
        allowedFormat: ["png", "jpg", "jpeg"],
    } as CloudinaryParams
})

export default storage