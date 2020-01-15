import api from './api/api'
export default {

  setAuthHeaderToken(token){
    api.defaults.headers.common['Authorization'] = 'Bearer '+token;
    return token;
  },

  getUserDetails(userId, token){
    const user = {userId: userId};
    console.log(`Sending User ${JSON.stringify(user)}`);
    return api.post('/profile/view/user', user)
  },


}
