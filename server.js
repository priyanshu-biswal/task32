const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  {
    id: "101",
    title: "Learn Express.js",
    description: "Understand REST API routes and endpoints",
    completed: false,
    createdAt: new Date().toISOString()
  }
];
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


app.get('/api/tasks', (req, res) => {
  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});


app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found.`
    });
  }

  return res.status(200).json({
    success: true,
    data: task
  });
});


app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found.`
    });
  }


  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (description !== undefined) tasks[taskIndex].description = description.trim();
  if (completed !== undefined && typeof completed === 'boolean') {
    tasks[taskIndex].completed = completed;
  }

  return res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: tasks[taskIndex]
  });
});


app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found.`
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: deletedTask
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});