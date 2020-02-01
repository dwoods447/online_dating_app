const jwt = require('jsonwebtoken');
const config  = require('../config/config');
module.exports = (req, res, next) => {
  const authorizedHeader = req.get('Authorization');
  if(!authorizedHeader){
    const error  = new Error('Not Authenticated.');
    error.statusCode = 401;
    throw error;
  }
  // ['Bearer ' 'tokenString']
  const token  = authorizedHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.authentication.jwtSecret);
  } catch(err){
    err.statusCode = 500;
    throw err;
  }

  if(!decodedToken){
    const error  = new Error('Not Authenticated.');
    error.statusCode = 401;
    throw error;
  }

    req.userId = decodedToken.userId;
    next();
}
