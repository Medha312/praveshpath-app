import React, { useState } from 'react';
// All imports are now grouped at the top of the file
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from '@mui/material';

const AddCollegeForm = ({ onCollegeAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    type: 'Govt',
    nirfRanking: '',
    counsellingCode: '',
    websiteUrl: '',
    imageUrl: '',
  });

  const { name, city, state, type, nirfRanking, counsellingCode, websiteUrl, imageUrl } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    onCollegeAdd(formData);

  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Add New College</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}><TextField fullWidth label="College Name" name="name" value={name} onChange={onChange} required /></Grid>
        <Grid item xs={6}><TextField fullWidth label="City" name="city" value={city} onChange={onChange} required /></Grid>
        <Grid item xs={6}><TextField fullWidth label="State" name="state" value={state} onChange={onChange} required /></Grid>
        <Grid item xs={6}><TextField fullWidth label="NIRF Ranking" name="nirfRanking" type="number" value={nirfRanking} onChange={onChange} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Counselling Code" name="counsellingCode" value={counsellingCode} onChange={onChange} required /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Website URL" name="websiteUrl" value={websiteUrl} onChange={onChange} /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Image URL" name="imageUrl" value={imageUrl} onChange={onChange} /></Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={type} label="Type" onChange={onChange}>
              <MenuItem value="Govt">Govt</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">Save College</Button>
        <Button type="button" variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default AddCollegeForm;