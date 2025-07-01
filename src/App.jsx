// ToDo App using React + MUI v7 with dark/light mode, sorting, filtering, and localStorage

import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Box, Paper, TextField, Button, IconButton,
  Checkbox, FormControlLabel, Select, MenuItem, InputLabel,
  AppBar, Toolbar, CssBaseline, useMediaQuery, createTheme, ThemeProvider,
  Switch, FormControl, Stack
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const getInitialTasks = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filter, setFilter] = useState('all');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
    [darkMode]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: editingId || uuidv4(),
      title,
      description,
      completed: false,
      createdAt: editingId ? tasks.find(t => t.id === editingId).createdAt : new Date().toISOString(),
    };

    if (editingId) {
      setTasks(tasks.map(task => task.id === editingId ? newTask : task));
      setEditingId(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTitle('');
    setDescription('');
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDelete = (id) => setTasks(tasks.filter(task => task.id !== id));

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = useMemo(() => {
    let temp = [...tasks];
    if (filter === 'completed') temp = temp.filter(t => t.completed);
    else if (filter === 'pending') temp = temp.filter(t => !t.completed);
    if (sortBy === 'status') temp.sort((a, b) => a.completed - b.completed);
    else temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return temp;
  }, [tasks, sortBy, filter]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>ToDo App</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline />
              <Button variant="contained" type="submit">{editingId ? 'Update' : 'Add'} Task</Button>
            </Stack>
          </form>
        </Paper>

        <Box display="flex" gap={2} mb={2}>
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={e => setSortBy(e.target.value)} label="Sort By">
              <MenuItem value="date">Creation Date</MenuItem>
              <MenuItem value="status">Completion Status</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={e => setFilter(e.target.value)} label="Filter">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {filteredTasks.map(task => (
          <Paper key={task.id} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flexGrow: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={task.completed} onChange={() => handleToggleComplete(task.id)} />}
                label={
                  <Box>
                    <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</Typography>
                    {task.description && <Typography variant="body2" color="text.secondary">{task.description}</Typography>}
                  </Box>
                }
              />
            </Box>
            <Box>
              <IconButton onClick={() => handleEdit(task)}><Edit /></IconButton>
              <IconButton onClick={() => handleDelete(task.id)}><Delete /></IconButton>
            </Box>
          </Paper>
        ))}
      </Container>
    </ThemeProvider>
  );
}
