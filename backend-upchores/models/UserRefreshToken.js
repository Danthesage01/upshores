import mongoose from "mongoose";

const UserRefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String },
});

export default mongoose.model("UserRefreshToken", UserRefreshTokenSchema);
