import jwt from 'jsonwebtoken'
import { defaultConfig } from '../config/default.js'

export function isPasswordRestTokenValid(req, res, next) {
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
    decodedToken = jwt.verify(token, defaultConfig.authentication.jwtSecret);
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
