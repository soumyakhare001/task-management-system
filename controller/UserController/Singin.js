//what will my sigin have

import { genToken } from "../../Config/token.js";
import { User } from "../../models/Usermodel.js";
import bcrypt from 'bcrypt';



export const Signin = async (req, res) => {

    try {
        //first of all we will grab all the elements which will be in my sigin in
        const { Username, email, password } = req.body; //take everything from req.body

        if (!Username || !email || !password) { //checking whether user have put all the information
            return res.status(400).json({ message: "Incomplete infromaton" });
        }
        //Check Whether the user exists or not 
        const existUser = await User.findOne({ email }); //we will get the user from the model and 
        // findOne with email to check if there is an user exists with the email if yes pass it to the eixstUser 
        if (existUser) {
            return res.status(400).json({ message: "User already exists" }); //if user exsits return 
        }
        //bcrypt the password
        const HashPassword = await bcrypt.hash(password, 10);
        //creating the user
        const user = await User.create({
            Username,
            email,
            password: HashPassword
        })
        //creating a token and passing the user id to the function of gentoken
        const token = genToken(user._id);
        //storing token into the cookie
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ message: "User got Created" });
    } catch (error) {
        console.log(error.name, error.message)
        return res.status(500).json({ message: "User can not be Created" });
    }


}