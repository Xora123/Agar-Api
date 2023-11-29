import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
    {
        filePath: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        creator: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        technical: {
            type: String,
            required: false,
        },
        origin: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        sizeX: {
            type: Number,
            required: false,
        },
        sizeY: {
            type: Number,
            required: false,
        },
        exhibitionId: {
            type: String,
            required: true,
        },
        imageName: {
            type: String,
            required: true
        },
        fondBlanc:{
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Image = mongoose.model( "Images", imageSchema );

export default Image
