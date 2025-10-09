import React, { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import backgroundImage from '../assets/images/hero-background.jpg';

// It now accepts one prop: onSearchSubmit
const HeroSection = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  return (
    <Box
      sx={{ minHeight: '60vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', /* ... other styles */ 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center', p: 4, }}
    >
      <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        KNOW MORE, DO MORE
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Take Informed Decisions
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: 'flex', width: '100%', maxWidth: '600px', bgcolor: 'white', borderRadius: '8px' }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a specific college by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } } }}
          InputProps={{
            startAdornment: ( <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> ),
          }}
        />
        {/* THE SEARCH BUTTON IS BACK */}
        <Button type="submit" variant="contained" sx={{ padding: '15px 30px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, bgcolor: 'var(--accent-color)', '&:hover': { bgcolor: '#e69500' } }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;