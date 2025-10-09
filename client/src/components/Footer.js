import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#212121',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1: College */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>COLLEGE</Typography>
            <Link href="#" color="inherit" display="block">Statewise Colleges</Link>
            <Link href="#" color="inherit" display="block">Explore all IITs</Link>
            <Link href="#" color="inherit" display="block">Explore all NITs</Link>
            {/* New Link Added Below */}
            <Link href="#" color="inherit" display="block">Colleges in Delhi NCR</Link>
          </Grid>

          {/* Column 2: Exam */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>EXAM</Typography>
            <Link href="#" color="inherit" display="block">JEE (Main)</Link>
            <Link href="#" color="inherit" display="block">JEE (Advanced)</Link>
            <Link href="#" color="inherit" display="block">BITSAT</Link>
            {/* New Link Added Below */}
            <Link href="#" color="inherit" display="block">WBJEE</Link>
          </Grid>

          {/* Column 3: Tools */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>TOOLS</Typography>
            <Link href="#" color="inherit" display="block">College Finder</Link>
            <Link href="#" color="inherit" display="block">JEE (Main) Rank Predictor</Link>
            <Link href="#" color="inherit" display="block">JEE (Adv) College Predictor</Link>
          </Grid>

          {/* Column 4: Company */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>COMPANY</Typography>
            <Link href="#" color="inherit" display="block">About Us</Link>
            <Link href="#" color="inherit" display="block">Contact Us</Link>
            {/* New Links Added Below */}
            <Link href="#" color="inherit" display="block">Privacy Policy</Link>
            <Link href="#" color="inherit" display="block">Terms of Service</Link>
          </Grid>
        </Grid>

        {/* Social Media and Copyright */}
        <Box mt={5} textAlign="center">
          <Typography variant="h5" sx={{ fontFamily: 'var(--font-headings)', mb: 2 }}>
            PraveshPath
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><Facebook /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><Twitter /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><LinkedIn /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><Instagram /></Link>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            © PraveshPath Copyright {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;