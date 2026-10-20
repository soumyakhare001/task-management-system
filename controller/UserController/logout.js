


export const logout = async (req, res) => {
    try {
       res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",

        });

        return res.status(200).json({ message: "user loged out" });
    } catch (error) {
        console.log(error.name, error.message);
        return res.status(500).json({ message: "logging out failed" });
    }

}