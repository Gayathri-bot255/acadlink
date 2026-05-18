import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/acadlink_fallback";

// If we can't connect to MongoDB, we'll log it but still start the server
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Proceeding with server startup (some features might fail without MongoDB)");
  });

import Course from "./models/Course.js";
import Teacher from "./models/Teacher.js";

async function seedData() {
  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    console.log("Seeding initial data...");
    
    const teachers = await Teacher.insertMany([
      { name: "Aris Vance", title: "Dr.", department: "Cybernetics & AI", rating: 4.8, reviewCount: 142, specialization: ["Neural Networks", "Machine Ethics"] },
      { name: "Elara Thorne", title: "Prof.", department: "Bio-Systems", rating: 4.5, reviewCount: 89, specialization: ["Synthetic Biology", "Genomic Data"] },
      { name: "Harlan Case", title: "Dr.", department: "Digital Arts", rating: 4.2, reviewCount: 65, specialization: ["Virtual Aesthetics", "Signal Theory"] }
    ]);

    await Course.insertMany([
      { title: "Advanced Cybernetics", code: "CS-401", description: "Exploration of neural interfacing and synthetic biology integration.", credits: 4, department: "Cybernetics", capacity: 50 },
      { title: "Neural Interface Design", code: "CS-405", description: "Design principles for high-bandwidth wetware links.", credits: 3, department: "Cybernetics", capacity: 30 },
      { title: "Data Narratives", code: "ENG-320", description: "Analyzing the storytelling potential of large-scale datasets.", credits: 3, department: "Digital Arts", capacity: 40 },
      { title: "AI Ethics & Protocol", code: "ETH-550", description: "Philosophical frameworks for autonomous systems.", credits: 3, department: "Cybernetics", capacity: 25 }
    ]);
    console.log("Seeding complete.");
  }
}

// API Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/feedback", feedbackRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AcadLink API is running" });
});

async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      configFile: path.join(process.cwd(), "client", "vite.config.ts"),
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
