import axios from 'axios'
import config from '../../../nuxt.config'
import * as dotenv from 'dotenv'
const defaultConfig = dotenv.config()

let api;
if(config.environment !== 'production'){
  api = axios.create({
      baseURL: 'http://localhost:3000/api'
  })
} else {
  api = axios.create({
    baseURL: `${config.env.baseUrl}/api`
  })

  console.log('BASEURL: ' + axios.defaults.baseURL)
  // console.log('process.env.BASE_URL: ' + process.env.BASE_URL)
  // console.log(process.env)
  console.log(config.env)
  console.log(config.env.baseUrl)
  console.log(`defaultConfig`)
  console.log(defaultConfig)
}

export default api;
