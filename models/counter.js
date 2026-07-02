import mongoose from "mongoose";
import site from "./site";

const counterSchema= new mongoose.Schema(
    {
        site:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Site',
            required: true
        },

        name:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^[a-z0-9]+(-[a-z0-9]*)$/, "Counter name must be lowercase and hyphen-separated(eg. example-counter1)"],
        },

        value:{
            type: Number,
            default: 0
        },
    },

    {timestamps: true}
);

counterSchema.index({site: 1, name: 1}, {unique: true});

export default mongoose.model('Counter', counterSchema);