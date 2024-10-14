import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const BackgroundContainer = styled(Container)({
  backgroundImage: `url('/src/images/logo.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
});

const LoginBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(0.5px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <BackgroundContainer maxWidth={false}>
      <LoginBox>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {/* <Box sx={{ bgcolor: 'white', p: 1, borderRadius: '50%', mr: 2 }}>
            <Typography
              variant="h5"
              component="span"
              sx={{ color: '#1a237e', fontWeight: 'bold' }}
            >
              iFitness
            </Typography>
          </Box> */}
          {/* <Typography
            variant="h4"
            component="span"
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            iFitness
          </Typography> */}
        </Box>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </LoginButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Typography variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Box>
        {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
            Login with Social Network
          </Typography>
          <IconButton sx={{ color: '#3b5998' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: '#1da1f2' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton sx={{ color: '#db4437' }}>
            <GoogleIcon />
          </IconButton>
        </Box> */}
      </LoginBox>
    </BackgroundContainer>
  );
};

export default LoginScreen;
