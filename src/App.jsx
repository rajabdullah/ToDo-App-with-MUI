import React, { useState, useEffect, useMemo } from "react";
import { CssBaseline, Container, createTheme, ThemeProvider, useMediaQuery, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";

const getInitialTasks = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("all");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(() => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }), [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
      setTasks(tasks.map(t => t.id === editingId ? newTask : t));
      setEditingId(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTitle("");
    setDescription("");
  };

  const handleEdit = task => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDelete = id => setTasks(tasks.filter(t => t.id !== id));

  const handleToggle = id => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const filteredTasks = useMemo(() => {
    let temp = [...tasks];
    if (filter === "completed") temp = temp.filter(t => t.completed);
    if (filter === "pending") temp = temp.filter(t => !t.completed);
    if (sortBy === "status") temp.sort((a, b) => a.completed - b.completed);
    else temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return temp;
  }, [tasks, sortBy, filter]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
            editingId={editingId}
          />
          <TaskFilters sortBy={sortBy} setSortBy={setSortBy} filter={filter} setFilter={setFilter} />
          <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
