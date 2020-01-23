import axios from 'axios'
import store from '../../../store/index'
let api;
if(process.env.NODE_ENV !== 'production'){
    api = axios.create({
      baseURL: 'http://localhost:3535',
     // Authorization: `Bearer ${store.state.token}`
    })
} else {
  api = axios.create({
    baseURL: ''
  })
}


export default api;
