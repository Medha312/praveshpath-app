import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentForm from '../components/StudentForm';
import HeroSection from '../components/HeroSection';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Link as MuiLink, Box, Paper } from '@mui/material';

const HomePage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      // CORRECTED: Using the environment variable
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/colleges/search?q=${query}`);
      setColleges(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error searching colleges:", err);
      alert("Could not perform search.");
      setLoading(false);
    }
  };
  
  const handlePrediction = async (studentData) => {
    setLoading(true);
    try {
      // CORRECTED: Using the environment variable
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/predict`, studentData);
      setColleges(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      alert("Could not fetch prediction.");
      setLoading(false);
    }
  };

  const handleShortlist = async (collegeId) => {
    if (!token) { alert('Please log in to save.'); navigate('/login'); return; }
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // CORRECTED: Using the environment variable
      await axios.put(`${process.env.REACT_APP_API_URL}/api/users/shortlist/${collegeId}`, null, config);
      alert('College saved!');
    } catch (err) {
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div>
      <HeroSection onSearchSubmit={handleSearch} />
      <div className="main-content">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <StudentForm onPredict={handlePrediction} />
          <hr style={{ margin: '40px 0' }} />
          <h2>Results</h2>
          {loading ? ( <p>Loading...</p> ) : (
            <div>
              {colleges.length > 0 ? (
                colleges.map(college => (
                  <MuiLink href={college.websiteUrl} target="_blank" rel="noopener noreferrer" underline="none" key={college._id}>
                    <Card className="college-card" sx={{ display: 'flex', mb: 2 }}>
                      <CardMedia component="img" sx={{ width: 151, height: 140, objectFit: 'contain', p: 1 }} image={college.imageUrl || 'https://via.placeholder.com/151'} alt={college.name} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent>
                          <Typography variant="h6" component="h3">{college.name}</Typography>
                          <Typography color="text.secondary" variant="body2">{college.location.city}, {college.location.state}</Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="body2"><b>Type:</b> {college.type}</Typography>
                            <Typography variant="body2"><b>NIRF Rank:</b> {college.nirfRanking || 'N/A'}</Typography>
                          </Box>
                        </CardContent>
                        <CardActions>
                          <Button variant="contained" size="small" onClick={(e) => { e.preventDefault(); handleShortlist(college._id); }}>
                            Save
                          </Button>
                        </CardActions>
                      </Box>
                    </Card>
                  </MuiLink>
                ))
              ) : ( <Typography>Please use the search or predictor form to find colleges.</Typography> )}
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;