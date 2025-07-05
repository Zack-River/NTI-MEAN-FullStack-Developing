const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function authenticate(req , res , next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if(!token) return res.status(401).json({message:"token is missing"});

    jwt.verify(token , process.env.SECRET, (err,data) => {
        if(err) return res.status(403).json({message: "invalid token"});
        req.user = data;
        next();
    });
}

module.exports = authenticate;