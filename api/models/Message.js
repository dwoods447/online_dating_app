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
        username: {
            type: String,
            required: true,
        },
        imageSrc: {
          type: String,
       },
        random:{
          type: String,
        },
        gender: {
          type: String,
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
      random:{
        type: String,
      },
      gender: {
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




MessageSchema.methods.markUserMessageAsRead = function(messageId){
  console.log(`Changing read status for message ${messageId}`)
  let readStatus  = this.unread;
  console.log(`Unread Message status: ${JSON.stringify(readStatus)}`);
  readStatus  = false;
  this.unread = readStatus;
  console.log(`status changed to : ${JSON.stringify(readStatus)}`);
  return this.save();
}

MessageSchema.methods.markMessageAsUnRead = function(messageId){
  let readStatus  = this.unread;
  console.log(`Unread Message status: ${JSON.stringify(readStatus)}`);
  readStatus  = true;
  this.unread = readStatus;
  console.log(`status changed to : ${JSON.stringify(readStatus)}`);
  return this.save();
}




module.exports = mongoose.model('Message', MessageSchema);
