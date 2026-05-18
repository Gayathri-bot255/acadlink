import express from "express";
import Course from "../models/Course.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create course (Admin only - simplified for demo)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
