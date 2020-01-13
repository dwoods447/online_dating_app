import api from './api/api'

export default {
  signIn(formData){
    return api.post('/login', formData)
  }
}
