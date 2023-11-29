import mongoose from "mongoose";

const exhibitonSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        template: {
            type: String,
            required: true,
        },
        artworksnb: {
            type: Number,
            required: true,
        },
        config: {
            type: String,
            required: false
        },
        folderUrl: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const Exhibition = mongoose.model( "Exhibitions", exhibitonSchema );

export default Exhibition
