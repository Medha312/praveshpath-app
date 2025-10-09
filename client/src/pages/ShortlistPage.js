import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Link as MuiLink, Box } from '@mui/material';

const ShortlistPage = () => {
  const [shortlist, setShortlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    // ... useEffect code is the same ...
    const fetchShortlist = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('http://localhost:5000/api/users/shortlist', config);
        setShortlist(res.data);
        setLoading(false);
      } catch (err) { console.error('Error fetching shortlist:', err); setLoading(false); }
    };
    fetchShortlist();
  }, [token]);

  const handleRemove = async (collegeId) => {
    // ... handleRemove code is the same ...
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/users/shortlist/${collegeId}`, config);
      setShortlist(shortlist.filter(college => college._id !== collegeId));
      alert('College removed from shortlist.');
    } catch (err) { console.error('Error removing college:', err); alert('Could not remove college.'); }
  };

  if (loading) {
    return <div className="main-content"><p>Loading your shortlist...</p></div>;
  }

  return (
    <div className="main-content">
      <h1>My Shortlisted Colleges</h1>
      {shortlist.length > 0 ? (
        <div>
          {shortlist.map(college => (
            <MuiLink href={college.websiteUrl} target="_blank" rel="noopener noreferrer" underline="none" key={college._id}>
              <Card className="college-card" sx={{ display: 'flex', mb: 2 }}>
                <CardMedia component="img" sx={{ width: 151 }} image={college.imageUrl || 'https://via.placeholder.com/151'} alt={college.name} />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="h3">{college.name}</Typography>
                    <Typography color="text.secondary">{college.location.city}, {college.location.state}</Typography>
                    {/* 👇 ADDED THIS BOX FOR TYPE AND RANKING 👇 */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography variant="body2"><b>Type:</b> {college.type}</Typography>
                      <Typography variant="body2"><b>NIRF Rank:</b> {college.nirfRanking || 'N/A'}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="error" onClick={(e) => { e.preventDefault(); handleRemove(college._id); }}>
                      Remove
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </MuiLink>
          ))}
        </div>
      ) : ( <p>Your shortlist is empty.</p> )}
    </div>
  );
};

export default ShortlistPage;