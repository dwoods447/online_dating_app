
   const User = require('../models/User');
   const Message = require('../models/Message');
   const fetch = require('node-fetch');
   const config = require('../config/config')
   const mongoose = require('mongoose');



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
            seekingGender,
            height,
            relationshipTypeSeeking,
            hairColor,
            eyeColor,
            highestEducation,
            secondLanguage,
            bodyType,
            postalCode,
            state,
            city,
            maritalStatus,
            hasChildren,
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
            isProfileCompleted
        } = req.body;

        const user = await User.findById(req.userId);
        if(!user){
            return res.status(422).json({message: 'No user found'});
        }
            if(seekingGender) user.seekingGender = seekingGender;
            if(height) user.height = height;
            if(relationshipTypeSeeking) user.relationshipTypeSeeking = relationshipTypeSeeking;
            if(hairColor) user.hairColor = hairColor;
            if(eyeColor) user.eyeColor = eyeColor;
            if(highestEducation) user.highestEducation = highestEducation;
            if(secondLanguage) user.secondLanguage = secondLanguage;
            if(bodyType) user.bodyType = bodyType;
            if(postalCode) user.postalCode = postalCode;
            if(state) user.state = state;
            if(city) user.city = city;
            if(maritalStatus) user.maritalStatus = maritalStatus;
            if(hasChildren !== null || hasChildren !== '') user.hasChildren = true;
            if(doesSmoke !== null || doesSmoke !== '') user.doesSmoke = true;
            if(doesDoDrugs !== '' || doesDoDrugs !== null) user.doesDoDrugs = true;
            if(doesDrink !== '' || doesDrink !== null) user.doesDrink = true;
            if(religion) user.religion = religion;
            if(profession) user.profession = profession;
            if(doesHavePets !== '' || doesHavePets !== null) user.doesHavePets = true;
            if(personality) user.personality = personality;
            if(ambitiousness) user.ambitiousness = ambitiousness;
            if(datingIntent) user.datingIntent = datingIntent;
            if(longestRelationShip) user.longestRelationShip = longestRelationShip;
            if(income) user.income = income;
            if(doesDateInteracially) user.doesDateInteracially = true;
            if(doesDateInteracially && interacialDatingPreferences) {
              if(interacialDatingPreferences.length > 0){
                user.interacialDatingPreferences.races = interacialDatingPreferences;
              }
            };
            if(raceDatingPreferences){
              if(raceDatingPreferences.length > 0){
                user.raceDatingPreferences.races = raceDatingPreferences;
              }
            };
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
          console.log(`Removing user from favorites....`);
          const { userProfileId } = req.body;
          console.log(`Profile Id of Person: ${JSON.stringify(userProfileId)}`);
          const currentUser = await User.findOne({_id: req.userId});
          if(!currentUser){
             return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }
         const personToRemove = await User.findOne({_id: userProfileId});
         //console.log(`personToRemove ${JSON.stringify(personToRemove)}`);
         if(!personToRemove){
           return res.status(404).json({message: 'This user was not found'});
        }
        console.log(`Id of person to remove ${JSON.stringify(personToRemove._id)}`);
        const personRemoved = await currentUser.removeUserFromFavorites(personToRemove);
        if(!personRemoved){
           return res.status(422).json({message: 'User not removed!'});
        }
        const userFavs = await User.findOne({_id: req.userId}).populate({path: "favorites.users.userId",  select: ['random', 'gender', 'username', 'images.imagePaths']});
        console.log(`Favs returned on server ${JSON.stringify(userFavs.favorites.users)}`);
        return res.status(200).json({message: 'User successfully removed from favorites', favorites: userFavs.favorites.users});
       },

       async removeUserFromBlockList(req, res, next){
        const { userProfileId } = req.body;
        const blocker = await User.findOne({_id: req.userId});
        if(!blocker){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
        }
        const personToUnBlock = await User.findOne({_id: userProfileId});
        console.log(`Id of person to remove ${JSON.stringify(personToUnBlock._id)}`);
         const userUnBlocked = await blocker.removeUserFromBlockList(personToUnBlock);
         if(!userUnBlocked){
            return res.status(422).json({message: 'There was an error trying to remove the user from block list!'});
         }
         const blockedUsers = await User.findOne({_id: req.userId}).populate({path: "blockedUsers.users.userId",  select: ['random', 'gender', 'username', 'images.imagePaths']});
         console.log(`Favs returned on server ${JSON.stringify(blockedUsers.blockedUsers.users)}`);
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
        //const messages = await Message.find({'recipient.id': user._id});
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

        // if(!messages){
        //   return res.status(500).json({message: 'Error retrieving messages'});
        // }
        console.log(`Totalitems: ${JSON.stringify(totalItems)}`);
        if(totalItems.length > 0){
          if(totalItems[0].hasOwnProperty("total_messages")){
            return res.status(200).json({messages: myMesages, totalItems: totalItems[0].total_messages});
          }
         }
          return res.status(200).json({messages: myMesages, totalItems: []});
       },


       async getMessagesFromSender(req, res, next){
        let user = await User.findOne({_id: req.userId});
        const { senderId } = req.params;
        let msgSender = await User.findOne({_id: senderId});
        if(!user){
          return res.status(401).json({message: 'Unauthorized you are not logged in!'});
        }
        // console.log('Running getMessagesFromSender');
        // console.log('Sender Id: '+ msgSender._id)
        // console.log('Reciver Id: '+ user._id)
        let messagesThread;
        const messagesThreadOne = await Message.find({$and: [{'recipient.id': mongoose.Types.ObjectId(msgSender._id), 'sender.id': mongoose.Types.ObjectId(user._id)}]}).select(["content", "date", "sender.imageSrc", "recipient.imageSrc", "sender.random", "recipient.gender", "recipient.random", "sender.gender", "unread", "sender.username", "recipient.username"]);
        const messagesThreadTwo = await Message.find({$and: [{'recipient.id': mongoose.Types.ObjectId(user._id)}, {'sender.id': mongoose.Types.ObjectId(msgSender._id)}]}).select(["content", "date", "recipient.imageSrc","sender.imageSrc", "sender.random","recipient.random", "sender.gender", "recipient.gender", "unread", "sender.username", "recipient.username"]);
        //console.log(`messagesThreadTwo: ${JSON.stringify(messagesThreadTwo)}`);
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
        })
;
        return res.status(200).json({messages: messagesThread});
       },

       async getSentMessagesForUser(req, res, next){
        let user = await User.findOne({_id: req.userId});
        //let sentMessages = await Message.find({'sender.id': user._id}).select(["content", "date", "unread", "sender.username", "recipient.username"]);

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
            $sort : { "messageContent.date": 1 }
          }
        ])
        return res.status(200).json({messages: mySentMesages});
       },


       async sendMessageToInbox(req, res, next){
        let statusCode;
        const {userProfileId, message } = req.body;
         const sender = await User.findById(req.userId);

         if(!sender){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }



         const receiverOfMessage = await User.findById(userProfileId);
         const userBlockedYou = await receiverOfMessage.checkIfUserIsBlocked(sender._id);
         const youblockedUser = await sender.checkIfUserIsBlocked(receiverOfMessage._id);

         if(userBlockedYou || youblockedUser){
          statusCode = 200;
          return res.status(200).json({message: 'You are prohibited from sending a message to this user!', statusCode: statusCode, blocked: true});
         }

       //  console.log(`Reciever: ${JSON.stringify(receiverOfMessage)}`);
         if(!receiverOfMessage){
             statusCode = 404;
            return res.status(404).json({message: 'Unable to locate user profile', statusCode: statusCode, blocked: false});
         }

         let imgSrc;
       //  console.log(`Sender: ${JSON.stringify(sender)}`);
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
        // const messageSent = await receiverOfMessage.sendMessageToUserInbox(sender, message);
         //const messageCopied = await sender.sendMessageToUserInbox(receiverOfMessage, message);
         if(!createdMessage){
            statusCode = 422;
            return res.status(422).json({message :'There was an error sending the  message!', statusCode: statusCode, blocked: false});
         }
         statusCode = 200;
         return res.status(200).json({message: 'Message sent sucessfully!', statusCode: statusCode,  blocked: false});
       },
       async deleteMessageFromInbox(req, res, next){
        const userWhoisRequestingDeletion = req.userId;
        const { messageId } = req.body;
        const user = await User.findById(userWhoisRequestingDeletion);
        if(!user){
            return res.status(401).json({message: 'Unauthorized you are not logged in!'});
         }
        const messages = await user.removeMessageFromUserInbox(messageId);
        if(!messages){
        return res.status(422).json({message: 'There was an error while trying to remove the message.'});
        }
        return res.status(200).json({message: 'Message deleted succesfully!'});
       },

      //  async getUserMessages(req, res, next){
      //   let messages;
      //   let inboxArry = [];
      //    let user = await User.findOne({_id: req.userId}).populate({
      //      path: "inbox.messages.from",
      //      select: ['username', 'images.imagePaths']
      //    })
      //   let myUser = await User.aggregate([
      //     {
      //       $match: { "_id": mongoose.Types.ObjectId(req.userId) }
      //     },
      //     {
      //       $unwind: "$inbox.messages"
      //     },
      //     {
      //       $group: {
      //         _id: { from: "$inbox.messages.from" },
      //         messages: {
      //           $push: {
      //             messageId: "$inbox.messages.messageId",
      //             content: "$inbox.messages.content",
      //             date: "$inbox.messages.date"
      //             // Add more info of the message here as needed
      //           }
      //         }
      //       },
      //     },

      //     {
      //       $project: {
      //         _id: 0,
      //         from: "$_id.from",
      //         inbox: { messages: "$messages" },

      //       }
      //     }
      //   ]);

      //  let userMessages =  myUser;
      //    messages = userMessages;
      //    if(!user){
      //       return res.status(401).json({message: 'Unauthorized you are not logged in!'});
      //    }
      //    return res.status(200).json({messageInbox: messages, messageInfoAddtional: inboxArry});
      //  },

       async getUserProfileViews(req, res, next){
        const userViews = await User.findOne({_id: req.userId}).populate({path: "profileViews.views.userId",  select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths']}).select(["-password"]);
       // console.log(`User Views resp ${JSON.stringify(userViews, null, 2)}`);
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
            console.log(`Search params re'vd on server: ${JSON.stringify(findParams)}`);
            const searchedUsers = await User.find(findParams)
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
         console.log('Advanced search....')
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
         // onlineStatus,
          city,
          postalCode,
          miles,
          usState,
          martialStatus,
          hasChildren,
          doesSmoke,
          doesDoDrugs,
          doesDrink,
          religion,
         // personality,
         // ambitiousness,
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
       // if(onlineStatus) findParams.onlineStatus = onlineStatus;
        if(city) findParams.city = city;
        if(usState) findParams.state = usState;
        if(martialStatus) findParams.martialStatus = { $in: martialStatus };
        if(hasChildren) findParams.hasChildren = hasChildren;
        if(doesSmoke) findParams.doesSmoke = doesSmoke;
        if(doesDoDrugs) findParams.doesDoDrugs = doesDoDrugs;
        if(doesDrink) findParams.doesDrink = doesDrink;
        if(religion.length > 0) findParams.religion = { $in: religion };
        // if(profession) findParams.profession = profession;
        // if(doesHavePets) findParams.doesHavePets = doesHavePets;
        // if(personality) findParams.personality = personality;
        // if(ambitiousness) findParams.ambitiousness =ambitiousness ;
        // if(longestRelationShip) findParams.longestRelationShip = longestRelationShip;
        if(income) findParams.income = { $gte: Number.parseInt(income) };
        if(doesDateInteracially) findParams.doesDateInteracially = doesDateInteracially;
        console.log(`Advanced Search - Interacial Dating Preference: ${JSON.stringify(interacialDatingPreferences)}`);
         if(doesDateInteracially && interacialDatingPreferences.length > 0){
              console.log(`Advanced Search - Interacial Dating Preference: ${JSON.stringify(interacialDatingPreferences)}`);
                let datingPreference = {'interacialDatingPreferences.races': {$in: interacialDatingPreferences}}
                findParams = {...findParams, ...datingPreference};
         }
        console.log(`Advanced Search - Race Dating Preference: ${JSON.stringify(raceDatingPreferences)}`);

          if(raceDatingPreferences.length > 0){
            console.log(`Advanced Search - Race Dating Preference: ${JSON.stringify(raceDatingPreferences)}`);
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
      // let checkIfYouAreBlocked =  {"blockedUsers.users": { $elemMatch: { $ne: mongoose.Types.ObjectId(userWhoIsSearching) } }};
      let checkIfYouAreBlocked =  {"blockedUsers.users.userId": { $not: { $eq: mongoose.Types.ObjectId(userWhoIsSearching)}}};
      let checkUserSame = {"_id": {$not: {$eq: mongoose.Types.ObjectId(userWhoIsSearching)}}};
      findParams = {...findParams, $and: [{...checkIfYouAreBlocked, ...checkUserSame}]};
      console.log(`Search params re'vd on server: ${JSON.stringify(findParams)}`);
        const searchedUsers = await User.find(findParams)
        // Return searched for users
        // check is the searching user in on any of ther searched users block list
        // if(!searchedUsers){
        //     return res.status(500).json({message: 'An error occured.'});
        // }
        // const filteredUsersWhoAreNotBlocked = searchedUsers.filter( user => {
        //    return  user.blockedUsers.users.map(a =>{
        //     return a.userId;
        //    }).indexOf(mongoose.Types.ObjectId(userWhoIsSearching)) == -1;
        // })
        //   // and filter them out of users search
        //   // and filter the user who is searching
        // const filteredForUserWhoIsSearching = filteredUsersWhoAreNotBlocked.filter(user  =>{
        //     return user._id.toString() != userWhoIsSearching;
        // })
        if(!searchedUsers){
          return res.status(500).json({message: 'An error occured'});
        }
        return res.status(200).json({users: searchedUsers});
       },

       async usernameLookUp(req, res, next){
            const { username } = req.body;
            const user = await User.findOne({uername: username});
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
        const { username } = req.body;
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
                const user = await User.findById(req.userId);
                // const zipCodesObjs = await fetch(`${config.ZIPCODE_API.URL}/${config.ZIPCODE_API.API_KEY}/radius.json/${user.postalCode}/${miles}/mile`);
                // const zipcodes = await zipCodesObjs.json();
                // const zipCodes = zipcodes.zip_codes.map(obj =>{
                //     return obj.zip_code;
                // })
                   const users = await User.aggregate([
                      {$sample: {size: 10}},
                    ]);
                /*
                  totalUsers = await User.find().countDocuments();
                  let users = await User.find()
                  .skip((page - 1) * profilesPerPage)
                  .limit(profilesPerPage);
                  hasNextPage = profilesPerPage * page < totalUsers;
                  hasPreviousPage = page > 1;
                  nextPage = page + 1;
                  prvPage = page - 1;
                  lastPage = Math.ceil(totalUsers/profilesPerPage);
                  */

                 let userToReturn = users.filter(user => {
                    return user._id.toString() !== req.userId;
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
       }
   }

