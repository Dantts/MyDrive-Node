require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_PRIVATE_KEY;

const configs = { expiresIn: '30 minutes' };

const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, configs);
}

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey);
}

const getTokenFromHeaders = (headers) => {
    const token = headers['authorization'];
    if(token){ return token }else{ return null }
}

module.exports = {generateJwt, verifyJwt, getTokenFromHeaders};