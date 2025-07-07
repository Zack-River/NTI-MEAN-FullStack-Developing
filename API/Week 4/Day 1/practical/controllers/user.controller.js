const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// signup function

const signup = async (req,res) => {
    try {
        const {name , email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Email and Password are required."});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: "Email already in use."});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({
            message: "Singed Up Successfully",
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });
    }
    catch(err) {
        console.error("Signup error: ",err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

module.exports = {signup}