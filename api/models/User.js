const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const moment = require('moment');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    random: {
      type: String,
      required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    age: moment(new Date(), 'MM/DD/YYYY').diff(moment(this.birthdate, 'MM/DD/YYYY'), 'years'),
    ethnicity: {
        type: String,
        required: true,
    },
    onlineStatus: {
        type: Boolean,
    },

    seekingGenders: {
        genders: [],
    },
    selectedMaritalStatuses: {
      statuses: [],
    },
    geekInterests: {
      interests: []
    },
    height: {
        type: Number
    },
    relationshipTypeSeeking: {
        type: String
    },
    description: {
      type: String
    },
    hairColor: {
        type: String
    },
    eyeColor: {
        type: String
    },
    highestEducation:{
        type: String
    },
    secondLanguage:{
        type: String
    },
    bodyType: {
        type: String
    },
    postalCode: {
        type: String
    },
    city: {
       type: String
    },
    state: {
        type: String
    },

    maritalStatus:{
        type: String
    },

    hasChildren: {
        type: Boolean
    },
    doesSmoke: {
        type: Boolean
    },
    doesDoDrugs: {
        type: Boolean
    },
    doesDrink: {
        type: Boolean
    },
    religion :{
        type: String
    },
    profession:{
        type: String
    },
    doesHavePets:{
        type: Boolean
    },
    personality:{
        type: String
    },
    ambitiousness: {
        type: String
    },
    datingIntent:{
        type: String
    },
    longestRelationShip:{
        type: String
    },
    income: {
        type: Number
    },
    doesDateInteracially:{
        type: Boolean
    },
    interacialDatingPreferences: {
        races: []
    },
    raceDatingPreferences: {
        races: [],
    },
    isProfileCompleted: {
        type: Boolean
    },
    isPremiumUser: {
       type: Boolean
   },
   userMatches: {
    matches: [
        {
            userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
        }
    ]
   },
    blockedUsers: {
        users: [
            {
                userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
            }
        ]
    },
    favorites: {
        users: [
            {
                userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
            }
        ]
    },
    profileViews: {
        views: [
            {
                userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
                date: {type: Date}
            }
        ]
    },
    images: {
        imagePaths: [
            {
                imageId: {type: Schema.Types.ObjectId},
                path: { type: String, required: true},
                date: {type: Date}
            }
        ],
    }
})



UserSchema.pre('save', function(next){
  if(!this.isModified('password')) return next();
    bcrypt.hash(this.password, 12, function(err, hash){
        if(err) return next(err);
        this.password = hash;
        next();
    });

})



UserSchema.methods.addImageToProfile = function(imagePath){
    // let fullPath = '';
    // let port = config.port.toString();
    // let host = config.host+':'+port;

    // fullPath = path.join(host, imagePath);
    // fullPath = "http://"+fullPath;
    const updatedImages = [...this.images.imagePaths];
    if(updatedImages.length <= 4){
        updatedImages.push({
            imageId: mongoose.Types.ObjectId(),
            path: imagePath,
            date: new Date(),
        })
    } else {
        // Only 4 images are allowed.
        return false;
    }

    this.images.imagePaths = updatedImages;
    return this.save();
}

UserSchema.methods.removeImageFromProfile = function(targetImg){
    const updatedImages = [...this.images.imagePaths];
    const foundImage = updatedImages.find(({ imageId }) => {
        return imageId == targetImg
    })
    if(!foundImage) return // image does not exist
    const imgPth = path.join(__dirname + '/./../../static/uploads/', foundImage.path);
    try {
       fs.unlinkSync(imgPth);
    } catch(err){
       console.error(`Error deleting file: ${err}`);
    }
    const userImages = updatedImages.filter(image => {
        return image.imageId != targetImg;
    })

    const newImages = [...userImages]
    this.images.imagePaths = newImages;
    return this.save();
}





UserSchema.methods.sendMessageToUserInbox = function(sender, message){
    const updatedMessages = [...this.inbox.messages];
    updatedMessages.push({
        messageId: mongoose.Types.ObjectId(),
        from: sender._id,
        content: message,
        date: new Date(),
    })
    this.inbox.messages = updatedMessages;
    return this.save();
}

UserSchema.methods.removeMessageFromUserInbox = function(messageId){
    const userInboxMessages = this.inbox.message.filter(message =>{
        return message._id.toString() !== messageId;
    })
    this.inbox.messages = userInboxMessages;
    return this.save();
}

UserSchema.methods.clearAllMessagesFromInbox = function(){
    this.inbox = { messages: [] };
    return this.save();
}

UserSchema.methods.addProfileViewer = function(userId){
    let today = new Date();
    const userProfileIndex = this.profileViews.views.findIndex(searchedViews => {
        return userId ===  searchedViews.userId.toString();
    });

    const updatedProfileViews = [...this.profileViews.views];
    if(userProfileIndex === -1 && this._id.toString() !== userId){
             // User is not in list of profile viewers

          updatedProfileViews.push({
            userId: mongoose.Types.ObjectId(userId),
            date: new Date()
        })
    }else {
        // let lastView;
        // lastView = this.profileViews.views[this.profileViews.views.length - 1]
        // if(new Date(lastView.date) < today){
        //          //Todays date is greater than view.date add new view
        //         updatedProfileViews.push({
        //             userId: userId,
        //             date: new Date()
        //         })
        // }
    }
    this.profileViews.views = updatedProfileViews;
    return this.save();
}


UserSchema.methods.addUserToBlockList = function(userId){
    const userBlockedIndex = this.blockedUsers.users.findIndex(searchedUser => {
        return userId === searchedUser.userId.toString();
    });

    const updatedBlockedUsers = [...this.blockedUsers.users];

    if(userBlockedIndex ===  -1){
         // User is not in block user list add them
         updatedBlockedUsers.push({
            userId: mongoose.Types.ObjectId(userId),
        })
    }  else {
            // User is in block user list DONT add them
            return;
    }

    const newBlockList = {
        users:  updatedBlockedUsers
    }
    this.blockedUsers =  newBlockList;
    return this.save();
}




UserSchema.methods.checkIfUserIsBlocked = function(userId){

    const userBlockedIndex = this.blockedUsers.users.findIndex(searchedUser => {
        return userId === searchedUser.userId.toString();

    });
    if(userBlockedIndex !== -1){
        // User is already in blocked user list
        return true;
    }
    return false;
}



UserSchema.methods.checkIfUserIsMutualMatch = function(userId){

    const userMatchIndex = this.userMatches.matches.findIndex(searchedUser => {
        return userId._id.toString() === searchedUser.userId.toString();

    });
    if(userMatchIndex !== -1){
        // User is already in match list
        return true;
    }
    return false;
}

UserSchema.methods.addUserToFavorites = function(userId){
    const userFavoriteIndex = this.favorites.users.findIndex(searchedUser => {
        return userId._id.toString() === searchedUser.userId.toString();
    });
    const updatedFavorites = [...this.favorites.users];

    if(userFavoriteIndex === -1){
          // User is not in favorites add them
          updatedFavorites.push({
            userId: userId,
        })
    } else {
      // User is in favorites list DONT add them
      return;
  }
    this.favorites.users = updatedFavorites;
    return this.save();
}



UserSchema.methods.addUserToMatchList = function(userId){
    const userMatchListIndex = this.userMatches.matches.findIndex(searchedUser => {
        return userId._id.toString() === searchedUser.userId.toString();
    });
    const updatedMatchList = [...this.userMatches.matches];

    if(userMatchListIndex === -1){
          // User is not in matches add them
          updatedMatchList.push({
            userId: userId,
        })
    } else {
      // User is in favorites list DONT add them
      return;
  }
    this.userMatches.matches = updatedMatchList;
    return this.save();
}




UserSchema.methods.removeUserFromFavorites = function(user){
    const userFavoriteIndex = this.favorites.users.findIndex(searchedUser => {
                return user._id.toString() === searchedUser.userId.toString();
        });

        const updatedFavorites = [...this.favorites.users];
        if(userFavoriteIndex === -1){
            // User was not found the list of favorites
            return false;
        }
        if(userFavoriteIndex >= 0){
            updatedFavorites.splice(userFavoriteIndex, 1);
        }

        const newFavorites = updatedFavorites

        this.favorites.users =  newFavorites;
        return this.save();
}


UserSchema.methods.removeUserFromBlockList = function(userId){
  const userBlockedIndex = this.blockedUsers.users.findIndex(searchedUser => {
    return userId._id.toString() === searchedUser.userId.toString();
  });
  const updatedBlockedUsers = [...this.blockedUsers.users];
  if(userBlockedIndex == -1){
      // User is not in the block list
      return false;
  }
  if(userBlockedIndex >= 0){
       // User is in block user list remove them
       updatedBlockedUsers.splice(userBlockedIndex, 1);
  }

  const newBlockList = updatedBlockedUsers;
  this.blockedUsers.users = newBlockList;
  return this.save();
}



UserSchema.methods.updateUserAge = function(){
    let age = this.age;
        age  = moment(new Date(), 'MM/DD/YYYY').diff(moment(this.birthdate, 'MM/DD/YYYY'), 'years');
        this.age = age;
        return this.save();
}



UserSchema.methods.getRandomArbitrary = function(min, max){
    return Math.ceil(Math.random() * (max - min) + min);
}








module.exports = mongoose.model('User', UserSchema);
