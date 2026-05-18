import express from "express";
import Feedback from "../models/Feedback.js";
import Teacher from "../models/Teacher.js";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit feedback
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { teacherId, courseId, rating, comment, difficulty, anonymous } = req.body;

    const feedback = new Feedback({
      student: req.user?.id,
      teacher: teacherId,
      course: courseId,
      rating,
      comment,
      difficulty,
      anonymous
    });

    await feedback.save();

    // Update teacher average rating (simplified)
    const feedbacks = await Feedback.find({ teacher: teacherId });
    const avgRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;
    
    await Teacher.findByIdAndUpdate(teacherId, { 
      rating: avgRating, 
      $inc: { reviewCount: 1 } 
    });

    res.status(201).json(feedback);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
