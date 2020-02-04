import api from './api/api'

export default {
  signIn(formData){
    return api.post('/login', formData)
  },
  signUp(formData){
    return api.post('/register', formData)
  },
  checkEmailUnique(email){
    return api.post('/check/email/unique', email)
  },
  checkUserNameUnique(username){
    return api.post('/check/username/unique', username)
  }
}
