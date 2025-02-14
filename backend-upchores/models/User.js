import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    companyName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companySize: { type: String },
    role: {
      type: String,
      enum: ["company", "super_admin"],
      default: "company",
    },
    acceptTermsAndConditions: {
      type: String,
      required: [true, "Please accept T&C"],
      enum: ["YES", "NO"],
      default: "NO",
    },
    image: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    subject: "accessAPI",
  });
};

UserSchema.methods.createRefreshJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_LIFETIME,
    subject: "refreshToken",
  });
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
