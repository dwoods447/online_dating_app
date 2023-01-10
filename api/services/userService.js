import { addUserToBlockList } from '../controllers/ProfileController.js'
import User from '../models/User.js'
const userService = {
  async findCurrentUser(userId){
    try {
      const user = await User.findById(userId)
      return user
    } catch (error) {
      throw new Error(error)
    }
  },
  async findUsersFavorites (userId) {
    try {
      const user = await User.findById(userId).populate({ path: 'favorites.users.userId', select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths'] })
      return user
    } catch (error) {
      throw new Error(error)
    }
  },

  async findUsersInBlockedList(userId){
    try {
      const user = User.findById(userId).populate({ path: 'blockedUsers.users.userId', select: ['random', 'gender', 'username', 'onlineStatus', 'images.imagePaths'] })
      return user
    } catch(error){
      throw new Error(error)
    }
  },

  async getTenRandomUsers(userId){
    try {
      // const currentUser = await User.findById(req.userId)
      // const filter = { postalCode: currentUser.postalCode }
      const filter = {}
      const users = await User.aggregate([
        {  $sample: { size: 10 } }
      ])
     return users
    }catch(error){
      throw new Error(error)
    }
  },

  async findCurrentUserForMatchList(userId){
    try {
      const currentUser = await User.findById(userId)
      return currentUser
    } catch(error){
      throw new Error(error)
    }
  },

  async findUserToAddForMatchList(userProfileId){
    try {
      return await User.findById(userProfileId)
    } catch(error){
      throw new Error(error)
    }
  },

  async addUnMatchedToMatchList(currentUser, userToAdd){
   try {
    await currentUser.addUserToMatchList(userToAdd)
   }catch(error){
    throw new Error(error)
   }
  },
   async checkMutalMatch(currentUser, userToAdd){
    try {
      return await userToAdd.checkIfUserIsMutualMatch(currentUser)
    } catch(error){
      throw new Error(error)
    }
   },

   async findBlocker(userId){
    try {
      return await User.findById(userId) 
    }catch(error){
      throw new Error(error)
    }
   },
   async checkIfUserIsBlocked(currentUser, targetUserId){
     try {
      return await currentUser.checkIfUserIsBlocked(targetUserId)
     }catch(error){
      throw new Error(error)
     }
   },
   async checkIfUserIsAlreadyInFavorites(currentUser, targetUserId){
    try {
     return await currentUser.checkIfUserIsAlreadyInFavorites(targetUserId)
    }catch(error){
     throw new Error(error)
    }
  },
   async addUserToBlockList(blocker, userToBlockId){
    try {
      return await blocker.addUserToBlockList(userToBlockId)
     }catch(error){
      throw new Error(error)
     }
   },
   async addUserToFavoriteList(currentUser, userToAdd){
    try {
      return await currentUser.addUserToFavorites(userToAdd)
     }catch(error){
      throw new Error(error)
     }
   },
 
}

export default userService
