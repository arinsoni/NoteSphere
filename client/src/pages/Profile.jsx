import React, { useContext } from 'react';

// My Components
import MyBox from '../components/MyBox';

// My assets
import dp from "../assets/images/dp.jpeg";
import bg from "../assets/images/bg.jpg"; 


// Material UI components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

//theme
import app_context from '../context/app/appContext';


const Profile = () => {
  const AppContext = useContext(app_context);
  const { theme } = AppContext
  return (
    <>
    <MyBox
      width="100%"
      height="300px"
      display="flex"
      alignItems="center" // Optional: Adjust the alignment of the content vertically
      justifyContent="center" // Optional: Adjust the alignment of the content horizontally
      position="relative"
      borderRadius="15px" // Set the border radius value here
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover", // to cover the given area
        backgroundPosition: "center", // to show image completely 
        
      }}
    />
      <Card
        sx={{
          position: "relative",
          mt: -7,
          mx: 3, // margin left and margin right
          px: 2,
          py: 2,
          backgroundColor: theme.palette.primary.dark
        }}
      >
        {/* container for all grid items with spacing between them 3 and vertically centered */}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar alt="Remy Sharp" src={dp} />
          </Grid>
          <Grid item>
            <MyBox color={theme.palette.font.main} fontSize = {theme.typography.h4.fontSize} fontFamily= {theme.typography.h4.fontFamily} fontWeight = {theme.typography.h4.fontWeight} >
                Arin Soni
            </MyBox>
            <MyBox color={theme.palette.font.light} fontSize = {theme.typography.h5.fontSize}  fontFamily= {theme.typography.h4.fontFamily} fontWeight = {theme.typography.h5.fontWeight}>
                Arin Soni
            </MyBox>
          </Grid>
        </Grid>

      </Card>
    
      </>
  );
}

export default Profile;

