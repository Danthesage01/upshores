import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

const updateUserProfile = async (req, res) => {
  try {
    const updates = ["image", "companyName", "companySize"];
    const user = await User.findById(req.params.userId).select("-password");
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    updates.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    res
      .status(StatusCodes.OK)
      .json({ user, message: "Profile updated successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { updateUserProfile };
