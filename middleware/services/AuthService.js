import api from './api/api'

export default {
  signIn(formData){
    return api.post('/login', formData)
  },
  signUp(formData){
    return api.post('/register', formData)
  },
  signOut(formData){
    return api.post('/logout', formData)
  },
  checkEmailUnique(email){
    return api.post('/check/email/unique', email)
  },
  checkUserNameUnique(username){
    return api.post('/check/username/unique', username)
  },
  resetPassword(email){
    return api.post('/user/password/reset', email);
  },
  updatePassword(data){
    return api.post(`/user/update/password`, data);
  }
}
