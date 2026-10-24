


export const logout = async (req, res) => {
    try {
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});

return res.status(200).json({
  message: "Logged out successfully"
});
       
    } catch (error) {
        console.log(error.name, error.message);
        return res.status(500).json({ message: "logging out failed" });
    }

}