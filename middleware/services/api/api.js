import axios from 'axios'
let api;
if(process.env.NODE_ENV !== 'production'){
  api = axios.create({
      baseURL: 'http://localhost:3000/api'
  })
} else {
  api = axios.create({
    baseURL: process.env.baseUrl
  })
}

export default api;
