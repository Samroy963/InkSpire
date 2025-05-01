const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = "rnsaho";

app.use(cookieParser());  // Add cookie-parser middleware
app.use(cors({
  credentials: true,
  origin: 'https://inkspire-client.onrender.com'  // Allow requests from your frontend
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); 

app.get('/', (req, res) => {
  res.send('🎉 Hello from the API!');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(userDoc);
  } catch (e) {
    console.error('Error registering user:', e);
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json('User not found');
  }
  const passOK = bcrypt.compareSync(password, userDoc.password);  // Corrected here
  if (passOK) {
    jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
      
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    res.json(info);
  });
});


app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc); 
  });

});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: 'No token found' });

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(403).json({ error: 'Token invalid' });

      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      if (!postDoc) return res.status(404).json({ error: 'Post not found' });

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) return res.status(403).json({ error: 'You are not the author' });

      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      res.json({ message: 'Post updated successfully' });
    });
  } catch (err) {
    console.error("🔥 PUT /post crashed:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'username')  // fixed here
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get('/post/:id', async (req,res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.delete('/post/:id', async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;

    if (!token) return res.status(401).json({ error: 'No token found' });

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(403).json({ error: 'Token invalid' });

      const postDoc = await Post.findById(id);
      if (!postDoc) return res.status(404).json({ error: 'Post not found' });

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) return res.status(403).json({ error: 'You are not the author' });

      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Post deleted successfully' });
    });
  } catch (err) {
    console.error("🔥 DELETE /post crashed:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/submit', (req, res) => {
  console.log('✅ Request received on /api/submit');
  console.log('🔍 Request body:', req.body);
  res.json({ message: 'Success' });
});

async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://samroy963roshan:samroypassword@test.7glhz3i.mongodb.net/?retryWrites=true&w=majority&appName=Test');
    console.log('✅ Connected to MongoDB');
    app.listen(4000, () => {
      console.log('🚀 Server is running on https://inkspire-api.onrender.com/');
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}

startServer();
