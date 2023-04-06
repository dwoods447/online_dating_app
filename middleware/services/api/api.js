import axios from "axios";
import config from "../../../nuxt.config";
import * as dotenv from "dotenv";
const defaultConfig = dotenv.config();

let api;
if (config.environment !== "production") {
  api = axios.create({
    baseURL: `http://localhost:${config.server.port}/api`,
  });
} else {
  api = axios.create({
    baseURL: `${config.env.baseUrl}:${config.server.port}/api`,
  });
}

export default api;
