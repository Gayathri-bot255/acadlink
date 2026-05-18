import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
  department: { type: String, required: true },
  capacity: { type: Number, default: 50 },
  enrolledCount: { type: Number, default: 0 },
  syllabus: [String],
  prerequisites: [String],
  schedule: [{
    day: String,
    time: String
  }],
  status: { type: String, enum: ["active", "completed", "starred"], default: "active" }
});

export default mongoose.model("Course", courseSchema);
