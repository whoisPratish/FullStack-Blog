const mongoose = require('mongoose')


const fileSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        },
        uploaded_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },  
    },
    { timestamps: true }
);


const Post = mongoose.model('Post', postSchema);

module.exports = Post