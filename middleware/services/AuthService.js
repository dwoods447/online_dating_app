import api from './api/api'

export default {
  signIn(formData){
    return api.post('/login', formData)
  },
  signUp(formData){
    return api.post('/register', formData)
  }
}
