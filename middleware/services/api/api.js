import axios from 'axios'
import store from '../../../store/index'
let api;
if(process.env.NODE_ENV !== 'production'){
  if(store.state){
    api = axios.create({
      baseURL: 'http://localhost:3535',
      Authorization: `Bearer ${store.state.token || null}`
    })
  } else {
    api = axios.create({
      baseURL: 'http://localhost:3535',
    })
  }

} else {
  api = axios.create({
    baseURL: ''
  })
}


export default api;
