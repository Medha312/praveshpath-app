import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Paper, List, ListItem, ListItemText, IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCollegeForm from '../components/admin/AddCollegeForm'; // <-- IMPORT THE NEW FORM

const AdminPage = () => {
  const [colleges, setColleges] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // <-- STATE TO TOGGLE FORM
  const { token } = useAuth();

  useEffect(() => {
    // ... same useEffect to fetch colleges ...
    const fetchColleges = async () => { try { const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/colleges`); setColleges(res.data); } catch (err) { console.error('Failed to fetch colleges:', err); }}; fetchColleges();
  }, []);

  const handleDelete = async (collegeId) => {
    // ... same handleDelete function ...
    if (!window.confirm('Are you sure?')) return; try { const config = { headers: { Authorization: `Bearer ${token}` } }; await axios.delete(`${process.env.REACT_APP_API_URL}/api/colleges/${collegeId}`, config); setColleges(colleges.filter(c => c._id !== collegeId)); alert('College deleted.'); } catch (err) { console.error('Failed to delete:', err); alert('Error deleting college.'); }
  };

  // 👇 NEW FUNCTION TO HANDLE ADDING A COLLEGE 👇
  const handleAddCollege = async (collegeData) => {
    const newCollege = {
        ...collegeData,
        location: { city: collegeData.city, state: collegeData.state }
    };

    try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/colleges`, newCollege, config);

        // Add the new college to the top of the list and hide the form
        setColleges([res.data, ...colleges]);
        setShowAddForm(false);
        alert('College added successfully!');
    } catch (err) {
        console.error('Failed to add college:', err);
        alert('Error: ' + (err.response?.data?.message || 'Could not add college.'));
    }
  };

  return (
    <div className="main-content">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard: Manage Colleges
      </Typography>

      {/* 👇 BUTTON TO TOGGLE THE FORM 👇 */}
      {!showAddForm && (
        <Button variant="contained" onClick={() => setShowAddForm(true)} sx={{ mb: 2 }}>
          Add New College
        </Button>
      )}

      {/* 👇 CONDITIONALLY RENDER THE FORM 👇 */}
      {showAddForm && <AddCollegeForm onCollegeAdd={handleAddCollege} onCancel={() => setShowAddForm(false)} />}

      <Paper sx={{ mt: 2 }}>
        <List>
          {colleges.map((college) => (
            <ListItem
              key={college._id}
              secondaryAction={<IconButton edge="end" onClick={() => handleDelete(college._id)}><DeleteIcon color="error" /></IconButton>}
            >
              <ListItemText primary={college.name} secondary={`${college.location.city}, ${college.location.state}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default AdminPage;