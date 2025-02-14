import mongoose from "mongoose";

const TalentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String },
    role: { type: String },
    location: { type: String },
    skills: [String],
    monthlyRate: { type: String, required: true },
    linkedInUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Talent", TalentSchema);
