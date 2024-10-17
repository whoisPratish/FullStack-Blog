const mongoose = require('mongoose')


const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },  
    },
    { timestamps: true }
);


const Comment = mongoose.model('Comment', postSchema);

module.exports = Comment