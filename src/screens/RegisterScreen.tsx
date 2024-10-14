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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { setDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const BackgroundContainer = styled(Container)({
  backgroundImage: `url('/src/images/Logo2.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
});

const RegisterBox = styled(Box)(({ theme }) => ({
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

const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
      });
      dispatch(setUser(userCredential.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try a different email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address. Please check and try again.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <BackgroundContainer maxWidth={false}>
      <RegisterBox>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Register
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <RegisterButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            REGISTER
          </RegisterButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="body2">
                Already have an account? Login
              </Typography>
            </Link>
          </Box>
        </Box>
        {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
            Register with Social Network
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
      </RegisterBox>
    </BackgroundContainer>
  );
};

export default RegisterScreen;
