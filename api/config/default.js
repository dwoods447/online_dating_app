import * as dotenv from "dotenv";
dotenv.config();

export const defaultConfig = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || "localhost",
  node_mailer_key: process.env.NODE_MAILER_KEY,
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
  facebook: {
    FACEBOOK_APP_ID: "",
    FACEBOOK_APP_SECRET: "",
  },
  google: {
    PLACES_API: process.env.PLACES_API,
  },
  ZIPCODE_API: {
    URL: process.env.ZIPCODE_API_URI,
    API_KEY: process.env.ZIPCODE_API_KEY,
  },
  db: {
    connectString: process.env.DB_CONNECT_STRING,
    test: "mongodb+srv://online-dating-test:online-dating-test@cluster0.nh21d4g.mongodb.net/?retryWrites=true&w=majority",
  },
};
