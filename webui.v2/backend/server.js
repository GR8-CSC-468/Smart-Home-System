const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Environment variables for database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'shms-db',
  user: process.env.DB_USER || 'shms_user',
  password: process.env.DB_PASSWORD || 'shms_password',
  database: process.env.DB_NAME || 'shms_database'
};

let db;

(async function initializeDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.post('/signup', async (req, res) => {
  const { username, password, address } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, password, address) VALUES (?, ?, ?)',
      [username, hashedPassword, address]
    );
    res.status(201).send({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

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
      res.send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

