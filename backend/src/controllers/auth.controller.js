const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
};

async function registerUser(req, res) {
    try {
        const { userName, email, password, role = "user" } = req.body;

        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ userName }, { email }],
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                message: "User already exist",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            userName,
            email,
            password: hash,
            role,
        });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
}

async function loginUser(req, res) {
    try {
        const { userName, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ userName }, { email }],
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credential",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "User Login Successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token", cookieOptions);

        return res.status(200).json({
            message: "User logged out successfully !!",
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Logout failed",
            error: error.message,
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};