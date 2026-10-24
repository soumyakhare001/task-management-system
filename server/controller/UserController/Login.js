import { genToken } from "../../Config/token.js";
import { User } from "../../models/Usermodel.js";
import bcrypt from 'bcrypt';



export const login = async (req, res) => {
    try {
        //get the elements into login 
        const { email, password } = req.body;
        if (!email || !password) { //checking whether user have put all the information
            return res.status(400).json({ message: "Incomplete infromaton" });
        }

        //Check Whether the user exists or not 
        const existUser = await User.findOne({ email }); //we will get the user from the model and 
        // findOne with email to check if there is an user exists with the email if yes pass it to the eixstUser 
        if (!existUser) {
            return res.status(400).json({ message: "internal error" }); //if user doesnt exists return 
        }
        //if password matched from the hashedpassword if yes then it is the correct password
        const match = await bcrypt.compare(password, existUser.password);

        if (!match) {
            return res.status(400).json({ message: "Incorrect email or password" })
        }

        //creating a token and passing the user id to the function of gentoken
        const token = genToken(existUser._id);
      
        //storing token into the cookie
       res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
       

        return res.status(200).json({ message: "WELCOME BACK" });
    } catch (error) {
        console.log(error.name, error.message);
        return res.status(500).json({ message: "can not login" });
    }
}
