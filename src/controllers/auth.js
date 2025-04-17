import User from "../models/userModel.js";
import { errorResponse, successResponse } from "../utils/response.js";
import "dotenv/config.js";
import { envirment, jwtSecret } from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSingUp = async (req, res, next) => {
  try {
    const data = req.body;

    const { firstName, lastName, email, phone, password } = data;

    const existUser = await User.findOne({ email });
    console.log(existUser);
    if (existUser) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: firstName + " " + lastName,
      email: email,
      phone: phone,
      password: password,
    });
    if (!user) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Failed to create user",
      });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: envirment,
      path: "/",
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      payload: user.name,
    });
  } catch (error) {
    return next(error);
  }
};

const userSingin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: envirment,
      path: "/",
      sameSite: "none",
    });

    const withOutPassword = user.toObject();
    delete withOutPassword.password;

    return successResponse(res, {
      statusCode: 200,
      message: "User login successfully",
      payload: withOutPassword,
    });
  } catch (error) {
    return next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, jwtSecret);

    // Optionally fetch user info from DB
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    return successResponse(res, { statusCode: 200, payload: user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export { userSingUp, userSingin, verifyToken };
