import express from 'express'
import routes from '../routes/index.js'
// const router = express.Router();
export const createServer = () => {
  const app = express()
  routes(app)
  return app
}
