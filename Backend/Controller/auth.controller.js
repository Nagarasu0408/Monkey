import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
// import user from "../models/user.model.js";




export const signup = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const usernameRegex = /^[a-zA-Z0-9]+$/;  // example: john123 or john_123
        // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        // if (!fullname || !username || !email || !password) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        console.log(password.length);
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const exisitingUser = await User.findOne({ username });

        if (exisitingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already taken" });
        }


        const salt = await bcrypt.genSalt(10);  //random salt
        const hashedPassword = await bcrypt.hash(password, salt);  //encryption


        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profilePic: newUser.profilePic,
                coverImg: newUser.coverImg,
            });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}




export const login = async (req, res) => {
    try {

        const { username, password } = req.body;


        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username credentials" }); // wrong username
        }

        const isMatch = await bcrypt.compare(password, user?.password || "");


        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password credentials" }); // wrong password
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profilePic: user.profilePic,
            coverImg: user.coverImg,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error login" });
    }
}




export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error logout" });
    }
}





export const getMe = async (req, res) => {
    try {
        const user = await User.findById(res.user?._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

