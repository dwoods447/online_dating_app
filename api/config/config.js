//const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  node_mailer_key: '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',
  authentication :{
      jwtSecret: 'Q43rf4r234rf23r5gffg345tr234r53245r25rfwERT4'
  },
  facebook :{
      FACEBOOK_APP_ID: '',
      FACEBOOK_APP_SECRET: ''
  },
  google: {
      PLACES_API: 'AIzaSyDyydKiPq4vudAwPPzRCIXU1Mjrh-7dinU'
  },
  ZIPCODE_API: {
      URL: `https://www.zipcodeapi.com/rest`,
      API_KEY: `tK6I0o3GZ1QCWCV6lhxiErBDFI2Ml9EQS5JX6z1YQJ3xTd5dv10zcpGEZ5jOcC41`,
  },
  db: {
      connectString: 'mongodb+srv://dwoods447:B0nky2345@cluster0-ygpnr.mongodb.net/online_dating?retryWrites=true&w=majority'
  }

}

