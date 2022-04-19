const mongoose = require('mongoose')
const {Schema, model} = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    editedAt:{
        type: Date,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:'user',
    }
});

const Post = model('Post', postSchema)

module.exports = Post