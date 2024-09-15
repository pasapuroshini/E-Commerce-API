import User from "../models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

// register user
export const registerUser = async (req,res) => {
    try {
        let {name,email,phone,password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        })

        const user =  await newUser.save();

        res.status(200).json({
            'message' : "Account Created Successfully!",
            'user': user
        })
    } catch (error) {
        return res.status(422).json({
            message: error.message
        })
    }
}

export const userLogin = async (req,res) => {
    try {
        let {email,password} =  req.body;
        var result = {}

        let findUser = await User.findOne({email: email});
        !findUser && res.status(400).json("Wrong Credentials")

        const validated = await bcrypt.compare(password, findUser.password)
        !validated && res.status(422).json("Incorrect Password");

        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.JWT_SECRET_KEY
        );

        result = {
            ...findUser._doc,
            access_token: token
        }

        return res.status(200).json(result)
    } catch (error) {
        return res.status(422).json({
            message: error.message
        })
    }
}