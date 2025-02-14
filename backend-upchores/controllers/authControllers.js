import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

import UserRefreshToken from "../models/UserRefreshToken.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const {
    companyName,
    email,
    password,
    companySize,
    acceptTermsAndConditions,
    role,
  } = req.body;

  if (!companyName || !email || !password || !acceptTermsAndConditions) {
    throw new BadRequestError("Please provide all values");
  }

  // checking if user already exist
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email Already Exists");
  }

  const user = await User.create({
    companyName,
    email,
    password,
    companySize,
    acceptTermsAndConditions,
    role,
  });

  const userResponse = {
    companyName: user.companyName,
    email: user.email,
    companySize: user.companySize,
    acceptTermsAndConditions: user.acceptTermsAndConditions,
    role: user.role,
  };

  return res.status(201).json({
    status: "Successful",
    message: "user created successfully",
    data: userResponse,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // const user = await User.findOne({ email });

  console.log(email, password);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Email or password invalid");
  }

  if (!user.password) {
    throw new UnAuthenticatedError(
      "Error signing you in with this method. Please try another one!"
    );
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("Email or password incorrect");
  }

  const accessToken = user.createJWT();
  const refreshToken = user.createRefreshJWT();

  // Check if user already has a refresh token
  const existingToken = await UserRefreshToken.findOne({ userId: user._id });

  if (existingToken) {
    // Update the existing refresh token
    existingToken.refreshToken = refreshToken;
    await existingToken.save();
  } else {
    // Create a new refresh token record
    await UserRefreshToken.create({
      userId: user._id,
      refreshToken,
    });
  }

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    data: {
      companyName: user.companyName,
      companySize: user.companySize,
      email: user.email,
      userId: user._id,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken,
      refreshToken,
    },
    message: `${user.companyName}, welcome back!`,
    status: StatusCodes.OK,
  });
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Refresh token not found!");
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );

    const userRefreshToken = await UserRefreshToken.findOne({
      refreshToken,
      userId: decodedRefreshToken.userId,
    });
    if (!userRefreshToken) {
      throw new BadRequestError("Refresh token invalid!");
    }
    await UserRefreshToken.deleteOne({ _id: userRefreshToken._id });

    const user = await User.findById(decodedRefreshToken.userId);

    const accessToken = user.createJWT();
    const newRefreshToken = user.createRefreshJWT();

    // Update or create a new refresh token
    await UserRefreshToken.updateOne(
      { userId: decodedRefreshToken.userId },
      { refreshToken: newRefreshToken },
      { upsert: true }
    );

    res.status(200).json({
      userId: decodedRefreshToken.userId,
      accessToken,
      refreshToken: newRefreshToken,
      message: "new tokens generated successfully",
    });
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      "-password"
    );

    if (!user) {
      throw new BadRequestError("User doesn't exist.");
    }

    res.status(StatusCodes.OK).json({
      data: user,
      message: `${user.companyName} is the current user`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    await UserRefreshToken.deleteOne({ refreshToken });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export { register, login, getCurrentUser, logout, refreshToken };
