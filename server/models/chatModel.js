import mongoose, { Types } from 'mongoose'

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    groupChat: {
        type: Boolean,
        required: true,
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    },
 members: [{
        type: Types.ObjectId,
        ref: 'User',
    }],

},{timestamps:true})

export const ChatModel = mongoose.model('Chat', chatSchema)