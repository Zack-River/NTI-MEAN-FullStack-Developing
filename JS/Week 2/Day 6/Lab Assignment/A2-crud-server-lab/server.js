const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const dataPath = path.join(__dirname, 'users.json');

app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

app.get('/users/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const user = data.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newUser = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    name
  };
  data.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const { name } = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const user = data.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newData = data.filter(u => u.id !== parseInt(req.params.id));
  if (newData.length === data.length) return res.status(404).json({ message: "User not found" });

  fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
  res.json({ message: "User deleted" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
