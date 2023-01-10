import api from './api/api'
export default {

  setAuthHeaderToken(token){
    api.defaults.headers.common['Authorization'] = 'Bearer '+token;
    return token;
  },

  getUserDetails(userId){
    const user = {userId: userId};
    return api.post('/view/user', user);
  },

  updateUserProfile(userData){
    return api.post('/user/update/userprofile', userData);
  },

  getRandomUsersInAuthUsersPostalCode(){
    return api.get('/view/random/users');
  },

  basicUserSearch(userSearchCriteria){
    return api.post('/general/search', userSearchCriteria);
  },

  advancedUserSearch(userSearchCriteria){
    return api.post('/advanced/search', userSearchCriteria);
  },

  addUserToBlockList(userToAdd){
    return api.post('/user/block/add', userToAdd);
  },

  removeUserFromBlockList(userToRemove){
    return api.post('/user/block/remove', userToRemove);
  },

  addUserToFavoriteList(userToAdd){
    return api.post('/add/favorites', userToAdd);
  },

  removeUserFromFavoriteList(userToRemove){
    return api.post('/remove/favorites', userToRemove);
  },

  sendUserMessage(messageDetails){
    return api.post('/send/message', messageDetails);
  },

  getUserMessages(page){
    return api.get('/inbox/messages', {
      params: page
    });
  },


  getSenderMessages(senderId){
    return api.get(`/sender/${senderId}/messages`);
  },

  uploadImg(file){
    const formData = new FormData();
    formData.append('image', file.image, file.image.name)
    return api.post(`/image/upload`, formData);
  },

  removeUploadedImg(imageId){
    return api.post(`/remove/image/upload`, imageId);
  },

  markMessageAsRead(messageId){
    return api.post(`/mark/message/read`, messageId);
  },

  getUserProfileViews(){
    return api.get('/profile/views');
  },

  getSentMessagesForUser(){
    return api.get('/sent/messages');
  },

  getUsersInFavoriteList(){
    return api.get('/user-list/favorites');
  },

  getUserInBlockList(){
    return api.get('/user-list/blocked');
  },

  deleteUserProfile(){
    return api.post('/remove/user');
  },
  
  getUserForMatchMaker(){
    return api.get('/user/matchmaker');
  },

  addUserToUserMatches(userProfileId){
    return api.post('/add-user/matchlist', userProfileId);
  },


}
