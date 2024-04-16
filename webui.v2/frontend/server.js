const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock database for demonstration purposes
let users = [];

app.post('/signup', (req, res) => {
  const { email, password, address } = req.body;
  // In a real application, you should hash the password and store it securely
  const newUser = { email, password, address };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'User logged in successfully', user });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/scenario', (req, res) => {
  const { scenario } = req.body;
  // In a real application, you would trigger the actual smart home actions here
  res.status(200).json({ message: `Scenario ${scenario} executed successfully` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
