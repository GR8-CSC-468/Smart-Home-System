const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Server port

// Enable CORS for all responses
app.use(cors({
  origin: '*', // Adjust according to your needs, '*' allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers to allow
}));

app.use(bodyParser.json()); // Parses JSON request bodies

// OpenAI configuration
const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIConfig);

// Database connection settings
const dbConfig = {
  host: process.env.DB_HOST || '10.43.190.3', // Use Kubernetes service DNS for DB host
  user: process.env.DB_USER || 'shms_user', // Match DB user from Dockerfile
  password: process.env.DB_PASSWORD || 'shms_password', // Match DB password from Dockerfile
  database: process.env.DB_NAME || 'shms_database' // Match DB name from Dockerfile
};

// Initialize database connection
let db;
async function initializeDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if cannot connect to database
  }
}
initializeDB();

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password, address } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password, address) VALUES (?, ?, ?)',
      [username, hashedPassword, address]
    );
    res.status(201).send({ message: 'User created', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ message: 'Username already exists' });
    } else {
      res.status(500).send({ message: 'Error registering user', error: error.message });
    }
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.send({ message: 'Login successful', user });
    } else {
      res.status(401).send({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

// Speech endpoint
app.get('/speak', async (req, res) => {
  try {
    const speechPath = path.resolve("./speech.mp3");
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: "Today is a wonderful day to build something people love!",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechPath, buffer);
    res.send('Speech file created successfully at ' + speechPath);
  } catch (error) {
    console.error('Failed to create speech file:', error);
    res.status(500).send({ message: 'Error creating speech file', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
