const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateToken (payload){
    const secretKey = process.env.SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
}

module.exports = generateToken;