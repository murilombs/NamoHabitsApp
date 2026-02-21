/**
 * Sample Mock Backend API Server
 *
 * This is a simple Express.js server that provides the API endpoints needed for NamoHabitsApp.
 * Run with: node mock-server.js
 *
 * Make sure you have installed: npm install express body-parser cors
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let habits = [
  {
    id: '1',
    title: 'Morning Exercise',
    description: 'Do 30 minutes of exercise every morning',
    category: 'Fitness',
    color: '#FF6B6B',
    createdAt: new Date().toISOString(),
    checkIns: [
      {
        date: new Date().toISOString().split('T')[0],
        completedAt: new Date().toISOString(),
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        completedAt: new Date().toISOString(),
      },
      {
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        completedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: '2',
    title: 'Read',
    description: 'Read for 20 minutes',
    category: 'Learning',
    color: '#4ECDC4',
    createdAt: new Date().toISOString(),
    checkIns: [
      {
        date: new Date().toISOString().split('T')[0],
        completedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: '3',
    title: 'Drink Water',
    description: 'Drink 8 glasses of water',
    category: 'Health',
    color: '#45B7D1',
    createdAt: new Date().toISOString(),
    checkIns: [],
  },
];

// Get all habits
app.get('/habits', (req, res) => {
  res.json(habits);
});

// Get habit by ID
app.get('/habits/:id', (req, res) => {
  const habit = habits.find(h => h.id === req.params.id);
  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }
  res.json(habit);
});

// Create habit
app.post('/habits', (req, res) => {
  const { title, description, category, createdAt, checkIns } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: 'Title and category are required' });
  }

  const newHabit = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description: description || '',
    category,
    color: getRandomColor(),
    createdAt: createdAt || new Date().toISOString(),
    checkIns: checkIns || [],
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
});

// Update habit
app.put('/habits/:id', (req, res) => {
  const { title, description, category } = req.body;
  const habit = habits.find(h => h.id === req.params.id);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  if (title) habit.title = title;
  if (description !== undefined) habit.description = description;
  if (category) habit.category = category;

  res.json(habit);
});

// Delete habit
app.delete('/habits/:id', (req, res) => {
  const index = habits.findIndex(h => h.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const deletedHabit = habits.splice(index, 1);
  res.json({ message: 'Habit deleted', habit: deletedHabit[0] });
});

// Check-in for habit
app.post('/habits/:id/check-in', (req, res) => {
  const { date, completedAt } = req.body;
  const habit = habits.find(h => h.id === req.params.id);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  // Check if already checked in for this date
  const existingCheckIn = habit.checkIns.find(ci => ci.date === date);

  if (!existingCheckIn) {
    habit.checkIns.push({
      date,
      completedAt: completedAt || new Date().toISOString(),
    });
  }

  res.json(habit);
});

// Helper function
function getRandomColor() {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Start server
app.listen(PORT, () => {
  console.log(`Mock API Server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});
