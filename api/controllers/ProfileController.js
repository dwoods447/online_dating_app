
   const User = require('../models/User');
   const Message = require('../models/Message');
   const fetch = require('node-fetch');
   const config = require('../config/config')
   const mongoose = require('mongoose');
   const path = require('path');
   const fs = require('fs');
   const nodemailer = require('nodemailer');
   const sendGridTransport = require('nodemailer-sendgrid-transport');
   const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.node_mailer_key
    }
    }));
    
   module.exports = {
       async getUserDetails(req, res, next){
            /*  User projection to limit fields
              // https://mongoosejs.com/docs/api.html#query_Query-projection
             */
           const { userId } = req.body;
           let userDetails;
           const userWhoisRequestingSearch = req.userId;
           let projection = {password: 0, email: 0, "favorites.users": 0}
           const userWhoSearching = await User.findOne({_id: userWhoisRequestingSearch}, projection);
           const searchedUser = await User.findOne({_id: userId}, projection);
           if(!searchedUser){
                return res.status(404).json({message: 'User with that ID not found!'});
            }
          await searchedUser.updateUserAge();

          const userBlockedYou = await searchedUser.checkIfUserIsBlocked(userWhoisRequestingSearch);
          const youblockedUser = await userWhoSearching.checkIfUserIsBlocked(userId);

           if(userBlockedYou || youblockedUser){
            return res.status(200).json({message: 'This user has prohibited you from viewing their users profile', blocked: true});
           }
             if(userId !== userWhoisRequestingSearch){
               const profileViewAdded = await searchedUser.addProfileViewer(userWhoisRequestingSearch);
             }
       // userDetails = await User.findOne({_id: userId}).select(["-password", "-blockUsers.users", "-profileViews.views", "-favorites.users"]);
            return res.status(200).json({message: 'User found', user: searchedUser, blocked: false});
       },

        async updateExtendedUserProfile(req, res, next){
        const {
            userId,
            seekingGenders,
            height,
            relationshipTypeSeeking,
            hairColor,
            eyeColor,
            highestEducation,
            secondLanguage,
            bodyType,
            postalCode,
            usState,
            city,
            maritalStatus,
            hasChildren,
            description,
            doesSmoke,
            doesDoDrugs,
            doesDrink,
            religion,
            profession,
            doesHavePets,
            personality,
            ambitiousness,
            datingIntent,
            longestRelationShip,
            income,
            doesDateInteracially,
            interacialDatingPreferences,
            raceDatingPreferences,
            geekInterests,
            selectedMaritalStatuses,

        } = req.body;
        let projection = {password: 0, email: 0, "favorites.users": 0}
        const user = await User.findOne({_id: req.userId}, projection);
        if(!user){
            return res.status(422).json({message: 'No user found'});
        }


            if(height) user.height = height;
            if(relationshipTypeSeeking) user.relationshipTypeSeeking = relationshipTypeSeeking;
            if(hairColor) user.hairColor = hairColor;
            if(eyeColor) user.eyeColor = eyeColor;
            if(highestEducation) user.highestEducation = highestEducation;
            if(secondLanguage) user.secondLanguage = secondLanguage;
            if(bodyType) user.bodyType = bodyType;
            if(postalCode) user.postalCode = postalCode;
            if(usState) user.state = usState;
            if(city) user.city = city;
            if(description) user.description = description;
            if(maritalStatus) user.maritalStatus = maritalStatus;
            if(hasChildren !== '') user.hasChildren = hasChildren;
            if(doesSmoke !== '') user.doesSmoke = doesSmoke;
            if(doesDoDrugs !== '') user.doesDoDrugs = doesDoDrugs;
            if(doesDrink !== '') user.doesDrink = doesDrink;
            if(religion) user.religion = religion;
            if(profession) user.profession = profession;
            if(doesHavePets !== '') user.doesHavePets = doesHavePets;
            if(personality) user.personality = personality;
            if(ambitiousness) user.ambitiousness = ambitiousness;
            if(datingIntent) user.datingIntent = datingIntent;
            if(longestRelationShip) user.longestRelationShip = longestRelationShip;
            if(income) user.income = income;
            if(doesDateInteracially !== '') user.doesDateInteracially = doesDateInteracially;
            if(doesDateInteracially === true && interacialDatingPreferences) {
              if(interacialDatingPreferences.length > 0){
                user.interacialDatingPreferences.races = interacialDatingPreferences;
              }
            };
            if(raceDatingPreferences){
              if(raceDatingPreferences.length > 0){
                user.raceDatingPreferences.races = raceDatingPreferences;
              }
            }
            if(geekInterests){
              if(geekInterests.length > 0){
                user.geekInterests.interests = geekInterests;
              }
            }
            if(selectedMaritalStatuses){
              if(selectedMaritalStatuses.length > 0){
                user.selectedMaritalStatuses.statuses = selectedMaritalStatuses;
              }
            }
            if(seekingGenders){
              if(seekingGenders.length > 0){
                user.seekingGenders.genders = seekingGenders;
              }
            }
            user.isProfileCompleted = true;
            const savedUser = await user.save();
            if(!savedUser){
                return res.status(422).json({message: 'There was an error saving the profile'});
            }
            return res.status(200).json({message: 'User Profile updated successfully!', user: savedUser });
       },

       async addUserToFavorites(req, res, next){
            const {userProfileId, } = req.body;
                const currentUser = await User.findById(req.userId);
                const userToAdd = await User.findById(userProfileId);
                const userAdded = await currentUser.addUserToFavorites(userToAdd);
             return res.status(200).json({message: 'User added to favorites successfully!'});
       },


       async removeUserFromFavorites(req, res, next){
          const { userProfileId } = req.body;
          const currentUser = await User.findOne({_id: req.userId});
          if(!currentUser){
             return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }
         const personToRemove = await User.findOne({_id: userProfileId});
         if(!personToRemove){
           return res.status(404).json({message: 'This user was not found'});
        }
        const personRemoved = await currentUser.removeUserFromFavorites(personToRemove);
        if(!personRemoved){
           return res.status(422).json({message: 'User not removed!'});
        }
        const userFavs = await User.findOne({_id: req.userId}).populate({path: "favorites.users.userId",  select: ['random', 'gender', 'username', 'images.imagePaths']});
        return res.status(200).json({message: 'User successfully removed from favorites', favorites: userFavs.favorites.users});
       },

       async removeUserFromBlockList(req, res, next){
        const { userProfileId } = req.body;
        const blocker = await User.findOne({_id: req.userId});
        if(!blocker){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
        }
        const personToUnBlock = await User.findOne({_id: userProfileId});
         const userUnBlocked = await blocker.removeUserFromBlockList(personToUnBlock);
         if(!userUnBlocked){
            return res.status(422).json({message: 'There was an error trying to remove the user from block list!'});
         }
         const blockedUsers = await User.findOne({_id: req.userId}).populate({path: "blockedUsers.users.userId",  select: ['random', 'gender', 'username', 'images.imagePaths']});
         return res.status(200).json({message: 'User removed from your block list', blockList: blockedUsers});
       },



       async getInboxMessagesForUser(req, res, next){
       // let currentPage =  1;
        let user = await User.findOne({_id: req.userId});
        if(!user){
          return res.status(401).json({message: 'Unauthorized you are not logged in!'});
        }

       // let perPage = 3;
        let totalItems = await Message.aggregate([
          {
            $match: { "recipient.id": mongoose.Types.ObjectId(req.userId) }
          },
          {
            $group : {
              _id: {from: "$sender.id"},
            messageContent: {
                 $push: {
                   messageId: "$_id",
                   sender: "$sender.username",
                   image: "$sender.imageSrc",
                   date: "$date",
                   content: "$content",
                   unread: "$unread",
                   random: "$sender.random",
                   gender: "$sender.gender"
                 }
               },
             },

          },
          {
            $count: "total_messages"
          }

        ])

        const myMesages = await Message.aggregate([
          {
            $match: { "recipient.id": mongoose.Types.ObjectId(req.userId) }
          },
          {
            $group : {
              _id: {from: "$sender.id"},
            messageContent: {
                 $push: {
                   messageId: "$_id",
                   sender: "$sender.username",
                   image: "$sender.imageSrc",
                   date: "$date",
                   content: "$content",
                   unread: "$unread",
                   random: "$sender.random",
                   gender: "$sender.gender"
                 }
               },
             }
          },
          {
            $sort : { "messageContent.date": -1 }
          },
          // { $skip : (currentPage  - 1 ) *  perPage },
          // { $limit:  perPage},

        ])
        if(totalItems.length > 0){
          if(totalItems[0].hasOwnProperty("total_messages")){
            return res.status(200).json({messages: myMesages, totalItems: totalItems[0].total_messages});
          }
         }
          return res.status(200).json({messages: myMesages, totalItems: []});
       },


       async getMessagesFromSender(req, res, next){
        // Logged in user
        let user = await User.findOne({_id: req.userId});
        const { senderId } = req.params;
        let msgSender = await User.findOne({_id: senderId});
        if(!user){
          return res.status(401).json({message: 'Unauthorized you are not logged in!'});
        }
        // user's account no longer exists
        if(!msgSender){
          return res.status(200).json({message: "User's account has been removed.", deletedAccount: true})
        }
        let messagesThread;
        const messagesThreadOne = await Message.find({$and: [{'recipient.id': mongoose.Types.ObjectId(msgSender._id), 'sender.id': mongoose.Types.ObjectId(user._id)}]}).select(["content", "date", "sender.id","recipient.id", "sender.imageSrc", "recipient.imageSrc", "sender.random", "recipient.gender", "recipient.random", "sender.gender", "unread", "sender.username", "recipient.username"]);
        const messagesThreadTwo = await Message.find({$and: [{'recipient.id': mongoose.Types.ObjectId(user._id)}, {'sender.id': mongoose.Types.ObjectId(msgSender._id)}]}).select(["content", "date",  "sender.id","recipient.id","recipient.imageSrc", "sender.imageSrc", "sender.random","recipient.random", "sender.gender", "recipient.gender", "unread", "sender.username", "recipient.username"]);
        messagesThread = [...messagesThreadOne, ...messagesThreadTwo];
        messagesThread =  messagesThread.sort((a, b)=>{
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          if(aDate < bDate){
            return -1;
          }
          if(aDate > bDate){
            return 1;
          }
          return 0;
        });
        return res.status(200).json({messages: messagesThread, deletedAccount: false});
       },

       async getSentMessagesForUser(req, res, next){
        let user = await User.findOne({_id: req.userId});
        const mySentMesages = await Message.aggregate([ 
          {
            $match: { "sender.id": mongoose.Types.ObjectId(req.userId) }
          },
          {
            $group : {
              _id: {to: "$recipient.id"},
            messageContent: {
                 $push: {
                   messageId: "$_id",
                   receiver: "$recipient.username",
                   sender: "$sender.username",
                   image: "$recipient.imageSrc",
                   date: "$date",
                   content: "$content",
                   unread: "$unread",
                   random: "$recipient.random",
                   receiverGender: "$recipient.gender",
                   senderGender: "$sender.gender"

                 }
               },
             }
          },
          {
            $sort : { "messageContent.date": -1 }
          }
        ])
        return res.status(200).json({messages: mySentMesages});
       },


       async sendMessageToInbox(req, res, next){
        let statusCode;
        const {userProfileId, message } = req.body;
         const sender = await User.findOne({_id: req.userId});

         if(!sender){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }

         let messageSender = sender._id.toString();
         const receiverOfMessage = await User.findOne({_id: userProfileId});
         let messageReciever = receiverOfMessage._id.toString();
         const userBlockedYou = await receiverOfMessage.checkIfUserIsBlocked(messageSender);
         const youblockedUser = await sender.checkIfUserIsBlocked(messageReciever);

         if(userBlockedYou || youblockedUser){
          statusCode = 200;
          return res.status(200).json({message: 'You are prohibited from sending a message to this user!', statusCode: statusCode, blocked: true});
         }


         if(!receiverOfMessage){
             statusCode = 404;
            return res.status(404).json({message: 'Unable to locate user profile', statusCode: statusCode, blocked: false});
         }

         let imgSrc;
         if(sender.images.imagePaths.length > 0){
          imgSrc = sender.images.imagePaths[0].path;
         } else {
          imgSrc = 'no-photo.provided.png';
         }

         let recieverImg;
         if(receiverOfMessage.images.imagePaths.length > 0){
           recieverImg = receiverOfMessage.images.imagePaths[0].path;
         } else {
           recieverImg ='no-photo.provided.png';
         }

         const createdMessage = new Message({
           content: message,
           sender: {
             id: mongoose.Types.ObjectId(sender._id),
             imageSrc: imgSrc,
             username:sender.username,
             random: sender.random,
             gender: sender.gender
            },
           recipient: {
             id: mongoose.Types.ObjectId(receiverOfMessage._id),
             imageSrc: recieverImg,
             username: receiverOfMessage.username,
             random: receiverOfMessage.random,
             gender: receiverOfMessage.gender
            },
           date: new Date(),
           unread: true,
         })

         const savedMessage = await createdMessage.save();
         if(!savedMessage){
             statusCode = 500;
             return res.status(500).json({message: `There was an error sending the message `, statusCode: statusCode, blocked: false});
         }

         if(!createdMessage){
            statusCode = 422;
            return res.status(422).json({message :'There was an error sending the  message!', statusCode: statusCode, blocked: false});
         }

         if(receiverOfMessage.random === 'true'){
          transporter.sendMail({
                to: 'dwoods447@gmail.com',
                bcc: 'dwoods447@gmail.com',
                from: 'ImSeekingGeeks',
                subject: 'New message recieved on ImSeekingGeeks',
                html: `
                <h1>Hello ${receiverOfMessage.username}, you have a new message from, ${sender.username}</h1>
                <div>
                    <p>Please <a href="https://www.imseekinggeeks.com/login">login</a> to view your message</p>
                </div>
                `
          })
         } else {
              transporter.sendMail({
                  to: receiverOfMessage.email,
                  bcc: 'dwoods447@gmail.com',
                  from: 'mail@imseekinggeeks.com',
                  subject: 'New message recieved on ImSeekingGeeks',
                  html: `
                  <h1>Hello ${receiverOfMessage.username}, you have a new message from, ${sender.username}</h1>
                  <div>
                      <p>Please <a href="https://www.imseekinggeeks.com/login">login</a> to view your message</p>
                  </div>
                  `
            })
         }
        
         statusCode = 200;
         return res.status(200).json({message: 'Message sent sucessfully!', statusCode: statusCode,  blocked: false});
       },


       async getUserProfileViews(req, res, next){
        const userViews = await User.findOne({_id: req.userId}).populate({path: "profileViews.views.userId",  select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths']}).select(["-password"]);
        if(!userViews){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }
         return res.status(200).json({views: userViews});
       },

       async generalUsersSearch(req, res, next){

           const userWhoIsSearching = req.userId;
           const self = await User.findOne({_id: userWhoIsSearching});
            // Get user search parameters
            const {
              gender,
              minAge,
              maxAge,
              minHeight,
              maxHeight,
              bodyType,
              datingIntent,
              ethnicity,
              highestEducation,
              onlineStatus,
              city,
              postalCode,
              miles,
              usState,
            } = req.body;
            let findParams = {};
            if(gender) findParams.gender = gender;
            if(minAge || maxAge) findParams.age = {$gte: Number.parseInt(minAge), $lte: Number.parseInt(maxAge)};
            if(minHeight || minHeight) findParams.height = {$gte: Number.parseInt(minHeight), $lte: Number.parseInt(maxHeight)};
            if(ethnicity) findParams.ethnicity = { $in: ethnicity };
            if(bodyType) findParams.bodyType = bodyType;
            if(datingIntent) findParams.datingIntent = datingIntent;
            if(highestEducation) findParams.highestEducation = highestEducation;
            if(onlineStatus) findParams.onlineStatus = onlineStatus;
            if(city) findParams.city = city;
            if(usState) findParams.state = usState;

            // Filter User search based on parameters
            //https://www.zipcodeapi.com/rest/zuOeAFr1BUb04kxoozJUQPt2Ll1GVnnaxrWN8zI9RG5ekH47oPn6zrdCqqprh7bI/radius.json/71260/25/mile
            const zipCodesObjs = await fetch(`${config.ZIPCODE_API.URL}/${config.ZIPCODE_API.API_KEY}/radius.json/${postalCode}/${miles}/mile`);
            const zipcodes = await zipCodesObjs.json();
            const zipCodes = zipcodes.zip_codes.map(obj =>{
                return obj.zip_code;
            })

            if(postalCode) findParams.postalCode = {$in: zipCodes};
            if(!zipCodes){
              return res.status(500).json({message: 'There was an error retrieving zipcodes'});
            }

            // let checkIfYouAreBlocked =  {"blockedUsers.users": { $elemMatch: { $ne: mongoose.Types.ObjectId(userWhoIsSearching) } }};
            let checkIfYouAreBlocked =  {"blockedUsers.users.userId": { $not: { $eq: mongoose.Types.ObjectId(userWhoIsSearching)  }}};
            //let checkIfYouAreBlocked =  {"blockedUsers.users.userId": { $eq: mongoose.Types.ObjectId(userWhoIsSearching)  }}; test if user is in block list
            let checkUserSame = {"_id": {$not: {$eq: mongoose.Types.ObjectId(userWhoIsSearching)}}};
            findParams = {...findParams, $and: [{...checkIfYouAreBlocked, ...checkUserSame}]};
            const searchedUsers = await User.find(findParams, {password: 0})
            // Return searched for users
            // check is the searching user in on any of ther searched users block list
            if(!searchedUsers){
                return res.status(500).json({message: 'An error occured'});
            }
            // const filteredUsersWhoHaveNotBlockedMe = searchedUsers.filter( user => {
            //     return user.blockedUsers.users.map(a =>{
            //     return a.userId.toString();
            //    }).indexOf(userWhoIsSearching) == -1;
            // })

          //   const filteredUsersIhaveNotBlocked = filteredUsersWhoAreNotBlocked.filter( user => {
          //     return  user.blockedUsers.users.map(a =>{
          //      return a.userId.toString();
          //     }).indexOf(userWhoIsSearching) == -1;
          //  })
              // and filter them out of users search
              // and filter the user who is searching
            // const filteredForUserWhoIsSearching = filteredUsersWhoAreNotBlocked.filter(user  =>{
            //     return user._id.toString() != userWhoIsSearching;
            // })

           // const userSearchResults = filteredForUserWhoIsSearching;
            return res.status(200).json({users: searchedUsers});
       },

       async advancedUsersSearch(req, res, next){
        const userWhoIsSearching = req.userId;
        // Get user search parameters
        const {
          gender,
          minAge,
          maxAge,
          minHeight,
          maxHeight,
          ethnicity,
          raceDatingPreferences,
          bodyType,
          highestEducation,
          city,
          postalCode,
          miles,
          usState,
          martialStatus,
          hasChildren,
          doesSmoke,
          doesDoDrugs,
          doesHavePets,
          doesDrink,
          religion,
          datingIntent,
          longestRelationShip,
          income,
          doesDateInteracially,
          interacialDatingPreferences
        } = req.body;
        let findParams = {};
        if(gender) findParams.gender = gender;
        if(minAge || maxAge) findParams.age = {$gte: Number.parseInt(minAge), $lte: Number.parseInt(maxAge)};
        if(minHeight || maxHeight) findParams.height = {$gte: Number.parseInt(minHeight), $lte: Number.parseInt(maxHeight)};
        if(ethnicity.length > 0) findParams.ethnicity = { $in: ethnicity };
        if(bodyType) findParams.bodyType = bodyType;
        if(datingIntent) findParams.datingIntent = datingIntent;
        if(highestEducation) {
          let educationalBackground;
          if(findParams.highestEducation === 'high school'){
            educationalBackground = ['high school'];
          }
          if(findParams.highestEducation === 'some college'){
            educationalBackground = ['high school', 'some college'];
          }
          if(findParams.highestEducation === 'some university'){
            educationalBackground = ['high school', 'some college', 'some university'];
          }
          if(findParams.highestEducation === 'associates degree'){
            educationalBackground = ['high school', 'some college', 'some university', 'associates degree'];
          }
          if(findParams.highestEducation === 'bachelors degree'){
            educationalBackground = ['high school', 'some college', 'some university', 'associates degree', 'bachelors degree'];
          }
          if(findParams.highestEducation === 'bachelors degree'){
            educationalBackground = ['high school', 'some college', 'some university', 'associates degree', 'bachelors degree'];
          }
          if(findParams.highestEducation === 'masters degree'){
            educationalBackground = ['high school', 'some college', 'some university', 'associates degree', 'bachelors degree', 'masters degree'];
          }
          if(findParams.highestEducation === 'phd/post doctoral'){
            educationalBackground = ['high school', 'some college', 'some university', 'associates degree', 'bachelors degree', 'masters degree', 'phd/post doctoral'];
          }
          findParams.highestEducation = { $in: educationalBackground };
        }
        if(city) findParams.city = city;
        if(usState) findParams.state = usState;
        if(martialStatus) findParams.martialStatus = { $in: martialStatus };
        if(hasChildren) findParams.hasChildren = hasChildren;
        if(doesSmoke) findParams.doesSmoke = doesSmoke;
        if(doesDoDrugs) findParams.doesDoDrugs = doesDoDrugs;
        if(doesDrink) findParams.doesDrink = doesDrink;
        if(religion.length > 0) findParams.religion = { $in: religion };
        if(doesHavePets) findParams.doesHavePets = doesHavePets;
        if(income) findParams.income = { $gte: Number.parseInt(income) };
        if(doesDateInteracially) findParams.doesDateInteracially = doesDateInteracially;
         if(doesDateInteracially && interacialDatingPreferences.length > 0){
                let datingPreference = {'interacialDatingPreferences.races': {$in: interacialDatingPreferences}}
                findParams = {...findParams, ...datingPreference};
         }
          if(raceDatingPreferences.length > 0){
            let datingPreference = {'raceDatingPreferences.races': {$in: raceDatingPreferences}}
            findParams = {...findParams, ...datingPreference};
          }
        // Filter User search based on parameters
        //https://www.zipcodeapi.com/rest/zuOeAFr1BUb04kxoozJUQPt2Ll1GVnnaxrWN8zI9RG5ekH47oPn6zrdCqqprh7bI/radius.json/71260/25/mile
        const zipCodesObjs = await fetch(`${config.ZIPCODE_API.URL}/${config.ZIPCODE_API.API_KEY}/radius.json/${postalCode}/${miles}/mile`);
        const zipcodes = await zipCodesObjs.json();
        const zipCodes = zipcodes.zip_codes.map(obj =>{
            return obj.zip_code;
        })
        if(postalCode) findParams.postalCode = {$in: zipCodes};
        if(!zipCodes){
          return res.status(500).json({message: 'There was an error retrieving zipcodes'});
        }
      let checkIfYouAreBlocked =  {"blockedUsers.users.userId": { $not: { $eq: mongoose.Types.ObjectId(userWhoIsSearching)}}};
      let checkUserSame = {"_id": {$not: {$eq: mongoose.Types.ObjectId(userWhoIsSearching)}}};
      findParams = {...findParams, $and: [{...checkIfYouAreBlocked, ...checkUserSame}]};
        const searchedUsers = await User.find(findParams, {password: 0})
        if(!searchedUsers){
          return res.status(500).json({message: 'An error occured'});
        }
        return res.status(200).json({users: searchedUsers});
       },

       async usernameLookUp(req, res, next){
            const { username } = req.body;
            const user = await User.findOne({uername: username, password: 0});
            if(!user){
                return res.status(422).json({message: 'No user with that username found!'});
            }
            return res.status(422).json({user: user});
       },



       async addUserToBlockList(req, res, next){
        const {userToBlockId } = req.body;
        const blocker = await User.findById(req.userId);
          if(!blocker){
              return res.status(401).json({message: 'Unauthorized you are not logged in!'});
          }



         const userBlocked = await blocker.addUserToBlockList(userToBlockId);
         if(!userBlocked){
            return res.status(200).json({message: 'User is already in the list'});
         }
         return res.status(200).json({message: 'User added to your block list'});
       },


       async uploadImage(req, res, next){

         const user = await User.findById(req.userId);
         if(!user){
          return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }
         if(!req.file){
            const error  = new Error('No image provided');
            return res.status(422).json({message: error});
         }

         let imgLength = user.images.imagePaths.length;
         if(imgLength <= 4){
         // const imageUrl = req.file.path;
          const imageUrl = req.file.filename;
          const imageUploaded = await user.addImageToProfile(imageUrl);
           if(!imageUploaded){
              return res.status(422).json({message: 'There was an error uplaoding your image'});
           }
         } else {
            return res.status(422).json({ message: 'You have exceeded the limit to the number of images you can upload' });
         }
          return res.status(200).json({message: 'Image uploaded successfully', user:user});
       },

       async deleteImage(req, res, next){
        const user = await User.findById(req.userId);
        const { imageId } = req.body;
        const imageRemoved = await user.removeImageFromProfile(imageId);
        if(!imageRemoved){
          return res.status(422).json({ message: 'There was an error removing the image.' });
        }
        return res.status(200).json({message: 'Image removed successfully', images: user.images.imagePaths});
       },

       async deleteUserProfile(req, res, next){
       // const { username, userId } = req.body;
          let user = await User.findOne({_id: req.userId});
          user.images.imagePaths.forEach(image =>{
                    const imgPth = path.join(__dirname + '/./../../static/uploads/', image.path);
                    try{
                      fs.unlinkSync(imgPth);
                    } catch(err){
                      console.error(`Error deleting file: ${err}`);
                    }
           })
           let emptyImages = [...user.images.imagePaths];
           emptyImages = [];
           user.images.imagePaths = emptyImages;
           const userSaved = await user.save();
           if(userSaved){
              const userDeleted = await User.deleteOne({_id: req.userId});
              if(userDeleted){
                return res.json({message: 'Account succesfully deleted'});
              }
            }
       },


       async getRandomUserForMatchMaker(req, res, next){
              let selectedGenders = [];
              try {
                const currentUser = await User.findById(req.userId);
                selectedGenders  = currentUser.seekingGenders.genders;
                   const users = await User.aggregate([
                    {
                      $match: {gender: {$in: selectedGenders}}
                    },  
                    {$sample: {size: 1}},
                    { $project: { password: 0 } }
                    ]);
                 let userToReturn = users.filter(user => {
                    return user._id.toString() !== req.userId
                  })
                  return  res.json({users: userToReturn});
              } catch(err){
                next(err);
              }

       },


       
       async getRandomUsersInAuthUsersPostalCode(req, res, next){
        let miles = 15;
        let page  =  1;
        let profilesPerPage = 10;
        let totalUsers;
        let hasNextPage;
        let hasPreviousPage;
        let nextPage;
        let prvPage;

             try {
               const currentUser = await User.findById(req.userId);
                  const users = await User.aggregate([
                     {$sample: {size: 10}},
                   ]);
                let userToReturn = users.filter(user => {
                   return user._id.toString() !== req.userId
                 })
                 return  res.json({users: userToReturn});
             } catch(err){
               next(err);
             }

      },

       async markMessageAsRead(req, res, next){
        const { messageId } = req.body;

        const message = await Message.findById({_id: messageId});
        const readMessage = await message.markUserMessageAsRead(messageId);
       },

       async getUsersInBlockList(req, res, next){
          try {
            let usersInBlockedList = [];
            const user = await User.findById(req.userId).populate({path: "blockedUsers.users.userId",  select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths']});
            if(!user){
              return res.status(500).json({message: "User not found!"});
            }
            usersInBlockedList = user.blockedUsers.users;
             return res.status(200).json({blockList: usersInBlockedList});
          } catch(err){
            next(err)
          }
       },


       async getUsersInFavoriteList(req, res, next){

        try {
          let userInFavoritesList = [];
          const user = await User.findById(req.userId).populate({path: "favorites.users.userId",  select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths']});
          if(!user){
            return res.status(500).json({message: "User not found!"});
          }
          userInFavoritesList = user.favorites.users;
          return res.status(200).json({favoriteList: userInFavoritesList});
        } catch(err){
          next(err)
        }
       },

       async addUserToMatchList(req, res, next){
         let isMutualMatch = false;
        const {userProfileId} = req.body;
        const currentUser = await User.findById(req.userId);
       // const userToAdd = await User.findOne({_id: userProfileId});
         const userToAdd = await User.findById(userProfileId);
        const userAdded = await currentUser.addUserToMatchList(userToAdd);
        const mutualMatch = await userToAdd.checkIfUserIsMutualMatch(currentUser);
        if(mutualMatch){
          isMutualMatch = true
          return res.status(200).json({message: 'User added to matches successfully! And is a Mutual Match', isMutualMatch: isMutualMatch});
        }
        return res.status(200).json({message: 'User added to matches successfully!', isMutualMatch: isMutualMatch});
       }
   }

