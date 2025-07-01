import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TaskFilters({ sortBy, setSortBy, filter, setFilter }) {
  return (
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
  );
}
