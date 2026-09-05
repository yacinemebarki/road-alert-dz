import mongoose  from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
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
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    }    
})

const Post = mongoose.model("Post", PostSchema);

export default Post;