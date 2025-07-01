import { Paper, Box, IconButton, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <Paper sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ flexGrow: 1 }}>
        <FormControlLabel
          control={<Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />}
          label={
            <Box>
              <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </Typography>
              {task.description && (
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              )}
            </Box>
          }
        />
      </Box>
      <Box>
        <IconButton onClick={() => onEdit(task)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <Delete />
        </IconButton>
      </Box>
    </Paper>
  );
}
