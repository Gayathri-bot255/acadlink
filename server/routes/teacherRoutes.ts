import express from "express";
import Teacher from "../models/Teacher.js";
import Feedback from "../models/Feedback.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get teacher by ID with their feedback
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    
    const feedback = await Feedback.find({ teacher: req.params.id }).populate("student", "name");
    res.json({ teacher, feedback });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
