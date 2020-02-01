import axios from 'axios'
let api;
if(process.env.NODE_ENV !== 'production'){
  api = axios.create({
    baseURL: 'http://localhost:3000/api'
  })
} else {
  api = axios.create({
    baseURL: 'https://online-dating-front-end-nuxt.herokuapp.com/api'
  })
}

export default api;
