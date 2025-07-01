import { Stack, TextField, Button, Paper } from "@mui/material";

export default function TaskForm({ title, description, setTitle, setDescription, handleSubmit, editingId }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline />
          <Button variant="contained" type="submit">
            {editingId ? "Update" : "Add"} Task
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
