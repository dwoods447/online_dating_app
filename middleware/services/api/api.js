import axios from 'axios'
import config from '../../../nuxt.config'
let api;
if(process.env.NODE_ENV !== 'production'){
  // api = axios.create({
  //   baseURL: 'http://localhost:' + config.server.port + '/api'
  // })

  api = axios.create({
      baseURL: 'http://localhost:3000/api'
    })

} else {
  // api = axios.create({
  //   baseURL: `${config.baseURI}/api`
  // })
}

export default api;
