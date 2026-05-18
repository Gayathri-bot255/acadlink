import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  preferredTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  enrolledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "confirmed" }
});

export default mongoose.model("Enrollment", enrollmentSchema);
