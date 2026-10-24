
import { Task } from "../../models/TaskModel.js";
import { User } from "../../models/Usermodel.js";
import bcrypt from 'bcrypt';



export const DeleteAccount = async (req, res) => {
    try {
        //get the elements into delete 
        const { Username, password } = req.body;

        if (!Username || !password) { //checking whether user have put all the information
            return res.status(400).json({ message: "Incomplete infromaton" });
        }

        //get req.userId from AuthMiddleware
        const userId = req.userId;

        //Check Whether the user exists or not 
        const user = await User.findById(userId); //we will get the user with the help of userId and 

        if (!user) {
            return res.status(400).json({ message: "internal error" }); //if user doesnt exists return 
        }
        
        if (Username !== user.Username) {
            return res.status(400).json({ message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        //if password matched from the hashedpassword if yes then it is the correct password
        if (!match) {
            return res.status(400).json({ message: "Incorrect email or password" })
        }
       //deleting the user
       await Task.deleteMany({ owner: userId });
       await User.findByIdAndDelete(userId);
        //clearing the cookie
      res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});

return res.status(200).json({
  message: "Account deleted successfully"
});

       
    } catch (error) {
        console.log(error.name, error.message);
        return res.status(500).json({ message: "could not delete the account" });
    }
}