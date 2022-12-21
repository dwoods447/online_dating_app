//const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  node_mailer_key: process.env.NODE_MAILER_KEY,
  authentication :{
      jwtSecret: process.env.JWT_SECRET
  },
  facebook :{
      FACEBOOK_APP_ID: '',
      FACEBOOK_APP_SECRET: ''
  },
  google: {
      PLACES_API:  process.env.PLACES_API
  },
  ZIPCODE_API: {
      URL: process.env.ZIPCODE_API_URI,
      API_KEY: process.env.ZIPCODE_API_KEY,
  },
  db: {
    connectString:  process.env.DB_CONNECT_STRING
  }

}

