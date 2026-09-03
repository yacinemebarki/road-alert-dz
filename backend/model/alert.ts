import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    view: {
        type: String,
        enum: ["New", "Update", "Old"],
        default: "New",
        required: true
    }
})

const Alert = mongoose.model("Alert", AlertSchema);
export default Alert;