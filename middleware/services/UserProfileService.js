import api from './api/api'
export default {

  setAuthHeaderToken(token){
    api.defaults.headers.common['Authorization'] = 'Bearer '+token;
    return token;
  },

  getUserDetails(userId, token){
    const user = {userId: userId};
    console.log(`Sending User ${JSON.stringify(user)}`);
    return api.post('/profile/view/user', user);
  },

  updateUserProfile(userData){
    return api.post('/profile/user/update/userprofile', userData);
  },

  getRandomUsersInAuthUsersPostalCode(){
    return api.get('/profile/view/random/users');
  },

  basicUserSearch(userSearchCriteria){
    return api.post('/profile/general/search', userSearchCriteria);
  },

  advancedUserSearch(userSearchCriteria){
    return api.post('/profile/advanced/search', userSearchCriteria);
  },


  addUserToBlockList(userToAdd){
    return api.post('/profile/user/block/add', userToAdd);
  },

  removeUserFromBlockList(userToRemove){
    return api.post('/profile/user/block/remove', userToRemove);
  },

  addUserToFavoriteList(userToAdd){
    return api.post('/profile/favorites/add', userToAdd);
  },

  removeUserFromFavoriteList(userToRemove){
    return api.post('/profile/favorites/remove', userToRemove);
  },

  sendUserMessage(messageDetails){
    return api.post('/profile/send/message', messageDetails);
  }


}
