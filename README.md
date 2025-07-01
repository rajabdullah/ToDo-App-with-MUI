# 📝 React + MUI ToDo App

A responsive, modern ToDo application built with React (v18) and Material UI (v7). It allows users to manage daily tasks with ease — add, edit, delete, filter, sort, and track completion status.

---

## ⚙️ Setup Instructions

1. Clone the repository:

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## ✅ Bonus Features Implemented

- 🌗 Dark/Light Mode: toggle using MUI's theme system
- 📂 LocalStorage persistence: (tasks are saved across page reloads)
- 🧪 Filter tasks: All, Completed, Pending
- ↕️ Sort tasks: By creation date or completion status
- 🧹 Component-based architecture for clean and maintainable code
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🖼 Scrollable task list with fixed form/filter at the top

---

## ⚖️ Decisions & Trade-offs

- ❌ Drag-and-drop was skipped for simplicity; can be added later using `react-beautiful-dnd`.
- ✅ Used Vite for a faster dev environment instead of Create React App.
- 🔀 Used UUID for task IDs to avoid reliance on any backend or database.
- 🧠 Tasks are stored in memory and localStorage — no backend API is used, keeping it lightweight.