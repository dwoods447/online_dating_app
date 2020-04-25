import axios from 'axios'
import config from '../../../nuxt.config'
let api;
if(process.env.NODE_ENV !== 'production'){
  api = axios.create({
    baseURL: 'http://localhost:' + config.server.port + '/api'
  })

} /*else if (rocess.env.NODE_ENV === 'production') {
  api = axios.create({
    baseURL: 'https://online-dating-front-end-nuxt.herokuapp.com/api'
  })
} */else {
  api = axios.create({
    baseURL: 'https://www.imseekinggeeks.com/api'
  })
}

export default api;
