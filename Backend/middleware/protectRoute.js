import User from '../models/user.model.js';
import jwt from "jsonwebtoken";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token provided' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ message: 'Not authorized, token is invalid' });
        }
        const user = await User.findById(decode.userId).select('-password');
        // console.log(user._id);
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        res.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};