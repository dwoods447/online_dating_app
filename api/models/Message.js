const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const MessageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        imageSrc: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },

    },
    recipient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
          type: String,
          required: true,
       },
       imageSrc: {
        type: String,
      },
    },
    date: {
        type: Date,
        required: true,
    },
    unread: {
        type: Boolean,
        required: true
    }
})



module.exports = mongoose.model('Message', MessageSchema);
