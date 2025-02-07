import React, { useState } from 'react';
import { Box } from '@mui/material';
// import Search from './Search';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BasicCard from '../components/BasicCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TappointLink from '../components/TappointLink';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating';

const styles = {
  container: {
    maxWidth: 1500,
    marginTop: '-1% !important',
    padding: '20px',
    // backgroundColor: '#f5f5f5',
    margin: '0 auto',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 280px)',
    rowGap: '15px',
    marginRight:'-31rem',
    columnGap: '300px',
    justifyContent: 'center',
    marginTop: '90px !important',

    // Add media query for smaller screens
    '@media (max-width: 1000px)': {
      // import Card from '../../components/patient/Card';
      display: 'flex', // Use flexbox layout
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      
      rowGap: '10px',
      columnGap: '10px',
    },
  },
  rightContainer: {
    backgroundColor: "#eeeeee",
    padding: '10px',
    marginLeft: '10rem',
  },
};

const Home = ({loggedIn}) => {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [rating, setRating] = useState(0); 
  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  return (
    <Box sx={{ ...styles.container, marginLeft: isSmallScreen ? 10 : theme.spacing(10) }}>
      <TappointLink />
      {/* Suggested for you */}

      <Box sx={{ ...styles.cardContainer, marginLeft: isSmallScreen ? 10 : theme.spacing(11) }}>
        <BasicCard />
        <BasicCard />
      </Box>
      <Card />

      {/* Rating component */}
      <Box display="flex" justifyContent="space-around">
        <Box >
          <Rating sx={styles.rightContainer}   style={{borderRadius:'1rem',marginLeft:'17rem',marginTop:'2rem',fontSize:'4rem'}}name="rating" value={rating} onChange={handleRatingChange} />
          <Typography variant="h5" component="div" style={{marginLeft:'20.5rem',marginTop:'1rem',fontSize:'2rem'}}>
            Overall Ratings
          </Typography>
        </Box>

        <Box marginTop='2.5rem'>
        <AccountCircleRoundedIcon style={{ fontSize: '48px',marginTop:'40px',marginLeft:'-5rem' }} sx={{ color: '#008080', bgcolor: 'white', borderRadius: '50%'  }} />
          <Typography style={{fontSize:'2rem',marginTop:'-6rem'}} variant="h5" component="div">
            Micheal Clerk
          </Typography>
          <Rating style={{fontSize:'2.5rem'}} name="rating" value={rating} onChange={handleRatingChange} />
          
          <Typography style={{fontSize:'2rem'}} variant="body" component="div">
            Great experience! Made a same <br/>day apppointment
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
