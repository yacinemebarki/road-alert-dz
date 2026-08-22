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
    }
})

const Alert = mongoose.model("Alert", AlertSchema);
export default Alert;