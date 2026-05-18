import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current student's enrollments
router.get("/my", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user?.id })
      .populate("course")
      .populate("preferredTeacher");
    res.json(enrollments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Enroll in a course
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { courseId, teacherId } = req.body;

    // Check if already enrolled
    const existing = await Enrollment.findOne({ student: req.user?.id, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enrollment({
      student: req.user?.id,
      course: courseId,
      preferredTeacher: teacherId
    });

    await enrollment.save();

    // Increment course enrolled count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

    res.status(201).json(enrollment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
