import mongoose from "mongoose";

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  created_at: Date,
  expires_at: Date,
});

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);

export default UserOTPVerification;
