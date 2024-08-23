import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


export const generateTokenAndSetCookie = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("jwt", token, {
        maxAge: 86400000,
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict" // CSRF protection cross-site request forgery attacks
    })

}