const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            public_id: String
        },
        bio: {
            type: String
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
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


const User = mongoose.model('User', UserSchema);

module.exports = User