const mongoose = require('mongoose')
const {Schema, model} = mongoose

const commentSchema = new Schema({
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
        ref:'User',
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        
        ref:'User',
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:'Post',
    }
});

const Comment = model('Comment', commentSchema)

module.exports = Comment