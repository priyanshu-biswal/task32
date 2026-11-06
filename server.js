const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [];

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Task title is required.'
    });
  }

  const newTask = {
    id: uuidv4(), 
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});