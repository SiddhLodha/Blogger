import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const CommentModel = mongoose.models.comment || mongoose.model('comment', Schema);

export default CommentModel;
