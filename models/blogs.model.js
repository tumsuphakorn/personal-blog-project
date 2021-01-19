import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

blogSchema.index({ title: "text", content: "text" });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;