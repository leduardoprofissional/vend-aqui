import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// DATABASE
mongoose.connect(process.env.MONGO_URI);

// MODELS
const User = mongoose.model("User", {
  email: String,
  password: String
});

const Ad = mongoose.model("Ad", {
  title: String,
  price: String,
  image: String,
  userId: String
});

// AUTH
app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hash
  });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(404);

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, email: user.email });
});

// ADS
app.get("/", (req, res) => {
  res.send("API Vend'Aqui rodando 🚀");
});

app.get("/ads", async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
});

app.post("/ads", async (req, res) => {
  const ad = await Ad.create(req.body);
  res.json(ad);
});

// UPLOAD
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    image: `${process.env.BASE_URL}/uploads/${req.file.filename}`
  });
});

// START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Servidor rodando"));
