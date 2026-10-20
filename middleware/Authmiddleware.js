import jwt from "jsonwebtoken";
// This middleware verifies the user's authentication using a JWT.
export const AuthMiddleware = (req, res, next) => {
    try {
         // Extracting the token from the request cookie.
        const token = req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({
                message: "Please log in"
            });
        }
        // Verifying the token and storing its decoded payload.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // Verifying the token and storing its decoded payload.
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};