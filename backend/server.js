import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.sendStatus(401);
  }
}

const app = express();
const Message = mongoose.model("Message", {
  from: String,
  to: String,
  text: String
});

app.post("/chat", async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
});

app.get("/chat/:user", async (req, res) => {
  const msgs = await Message.find({ to: req.params.user });
  res.json(msgs);
});

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

app.post("/ads", auth, async (req, res) => {
  const ad = await Ad.create({
    ...req.body,
    userId: req.userId
  });

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
