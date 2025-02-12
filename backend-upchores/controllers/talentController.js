import { StatusCodes } from "http-status-codes";
import multer from "multer";
import xlsx from "xlsx";
import Talent from "../models/Talent.js";

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadTalentsFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Parse Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const talents = jsonData.map((entry) => ({
      name: entry.name,
      email: entry.email,
      phone: entry.phone || "",
      location: entry.location || "",
      skills: entry.skills ? entry.skills.split(",").map((s) => s.trim()) : [],
      monthlyRate: entry.monthlyRate || "",
      linkedInUrl: entry.linkedInUrl || "",
    }));

    // Fetch existing emails in the database
    const existingEmails = new Set(
      (await Talent.find({ email: { $in: talents.map((t) => t.email) } })).map(
        (t) => t.email
      )
    );

    // Filter out talents that already exist
    const newTalents = talents.filter(
      (talent) => !existingEmails.has(talent.email)
    );

    if (newTalents.length === 0) {
      return res
        .status(200)
        .json({ message: "All talents already exist in the system" });
    }

    // Insert only new talents
    await Talent.insertMany(newTalents);

    res.status(201).json({
      message: `Talents uploaded successfully. ${
        newTalents.length
      } new talents added, ${talents.length - newTalents.length} skipped.`,
      data: newTalents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTalents = async (req, res) => {
  try {
    const talent = await Talent.find({});
    const total = await Talent.countDocuments({});
    if (!talent) {
      throw new BadRequestError("User doesn't exist.");
    }

    res.status(StatusCodes.OK).json({
      data: talent,
      message: `all talents fetched`,
      total,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

export { upload, uploadTalentsFromExcel, getTalents };
