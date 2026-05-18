import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true }, // e.g. "Dr.", "Prof."
  department: { type: String, required: true },
  bio: { type: String },
  photo: { type: String }, // Path to profile image
  specialization: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  contact: {
    email: String,
    office: String
  }
});

export default mongoose.model("Teacher", teacherSchema);
