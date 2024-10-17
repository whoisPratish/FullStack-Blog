const mongoose = require('mongoose')


const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        images: [
            {
                url: {
                    type: String,
                    required: true
                },
                public_id: {
                    type: String,
                    required: true
                }
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    { timestamps: true }
);


const Post = mongoose.model('Post', postSchema);

module.exports = Post