import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Container, Typography, Card, CardContent, Box, Avatar, IconButton, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  borderRadius: 20,
}));

const NutritionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 15,
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const MealButton = styled(Button)(({ theme, active }: { theme: any; active: boolean }) => ({
  borderRadius: 20,
  padding: theme.spacing(1, 3),
  backgroundColor: active ? theme.palette.primary.main : theme.palette.background.paper,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.background.default,
  },
}));

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#f5f5f5', borderRadius: 4, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="https://example.com/avatar.jpg" sx={{ width: 50, height: 50, mr: 2 }} />
          <Box>
            <Typography variant="body1">Hello,</Typography>
            <Typography variant="h5" fontWeight="bold">{user?.displayName || 'User'}</Typography>
          </Box>
        </Box>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>

      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Complete your daily nutrition
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <NutritionCard sx={{ bgcolor: '#ffebee' }}>
                <LocalFireDepartmentIcon color="error" />
                <Typography variant="h6">Kalori</Typography>
                <Typography variant="body2">Total cons</Typography>
                <Typography variant="h5" fontWeight="bold">832<Typography component="span" variant="body2">kCal</Typography></Typography>
              </NutritionCard>
            </Grid>
            <Grid item xs={4}>
              <NutritionCard sx={{ bgcolor: '#e8f5e9' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/3373/3373278.png" alt="Protein" style={{ width: 24, height: 24 }} />
                <Typography variant="h6">Protein</Typography>
                <Typography variant="body2">Total cons</Typography>
                <Typography variant="h5" fontWeight="bold">200<Typography component="span" variant="body2">gr</Typography></Typography>
              </NutritionCard>
            </Grid>
            <Grid item xs={4}>
              <NutritionCard sx={{ bgcolor: '#e3f2fd' }}>
                <WaterDropIcon color="primary" />
                <Typography variant="h6">Water</Typography>
                <Typography variant="body2">Total cons</Typography>
                <Typography variant="h5" fontWeight="bold">1000<Typography component="span" variant="body2">ml</Typography></Typography>
              </NutritionCard>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <MealButton active={true}>Breakfast</MealButton>
            <MealButton active={false}>Lunch</MealButton>
            <MealButton active={false}>Dinner</MealButton>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <img src="https://example.com/meal-image.jpg" alt="Meal" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, bgcolor: 'rgba(255,255,255,0.8)' }}>
              <Typography variant="h6">Meat rice with sauce</Typography>
              <Typography variant="body2">Fresh and low-calorie</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box>
                  <Typography variant="h6">290</Typography>
                  <Typography variant="body2">Calories</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">16<Typography component="span" variant="body2">gr</Typography></Typography>
                  <Typography variant="body2">Protein</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">56<Typography component="span" variant="body2">gr</Typography></Typography>
                  <Typography variant="body2">Carbs</Typography>
                </Box>
                <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default HomeScreen;