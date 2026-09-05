import mongoose  from "mongoose";
import { buffer } from "node:stream/consumers";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    descrtiption: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ["Broken", "Fixed", "In Progress"],
        default: "Broken"   
    },

    image: {
        data: buffer,
        contentType: String,
        required: true
    }
})

const Post = mongoose.model("Post", PostSchema);

export default Post;