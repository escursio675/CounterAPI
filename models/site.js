import mongoose from "mongoose";
import crypto from "crypto";
import { timeStamp } from "console";

const siteSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },

        apiKey:{
            type: String,
            required: true,
            unique: true,
            default: () => crypto.randomBytes(24).toString('hex')
        },

        allowedOrigins:{
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    }
);

export default mongoose.model('Site', siteSchema);