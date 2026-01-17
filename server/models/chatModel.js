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
    creatror: {
        type: Types.ObjectId,
        ref: 'User',
    },
 members: [{
        type: Types.ObjectId,
        ref: 'User',
    }],

},{timestamps:true})

export const Chat = mongoose.model('Chat', chatSchema)