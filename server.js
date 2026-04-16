const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

const SECRET = process.env.JWT_SECRET;

// MODELS
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String
});

const Ad = mongoose.model('Ad', {
  title: String,
  price: Number,
  category: String,
  type: String,
  owner: String
});

// AUTH
app.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hash });
  res.json(user);
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) return res.status(400).json({ error: 'Erro login' });

  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
});

// ADS
app.post('/ads', async (req, res) => {
  const ad = await Ad.create(req.body);
  res.json(ad);
});

app.get('/ads', async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
});

app.listen(3001, () => console.log('Rodando'));