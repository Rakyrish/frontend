import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useUser } from './context';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const {setuser} = useUser();
  

 



  useEffect(() => {
    console.log('Signup page loaded, initializing Google Sign-In on port 5000');
  }, []);

  const signupB = async () => {
    if (!username || !password || !email || !confirmPassword) {
      setError('All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/reg', {
        username,
        email,
        password1: password,
        password2: confirmPassword,
      });
      setError('');
      console.log('Signup response:', response.data);

      if (response.ok) {
      setSuccess(`Signup successful ${username} ! Redirecting to login...`);
      setuser(username);
        
      }

      
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google token:', credentialResponse.credential);
    try {
      const response = await axios.post('http://localhost:8000/api/google-signup', {
        token: credentialResponse.credential,
      });
      setError('');
      setSuccess('Google signup successful! Redirecting to home...');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error('Google signup error:', err);
      setError(err.response?.data?.message || 'Google signup failed.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
    setError('Google Sign-In failed. Ensure http://localhost:5000 is allowed in Google Console.');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '489999120739-3mi2mbtuse27jh38ga8779e0o5n7un87.apps.googleusercontent.com'}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f0f4f8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          className="signup-box"
          sx={{
            backgroundColor: '#ffffff',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '400px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2, width: '300px' }}
            error={error.includes('Username') || error.includes('All fields')}
            helperText={error.includes('Username') || error.includes('All fields') ? error : ''}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2, width: '300px' }}
            error={error.includes('Password') || error.includes('All fields')}
            helperText={error.includes('Password') || error.includes('All fields') ? error : ''}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2, width: '300px' }}
            error={error.includes('Password') || error.includes('All fields')}
            helperText={error.includes('Password') || error.includes('All fields') ? error : ''}
          />
         <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: 2, width: '300px' }}
              error={error.includes('email') || error.includes('required')}
              helperText={error.includes('email') || error.includes('required') ? error : ''}
              InputProps={{
                autoComplete: 'email', // Suggest email addresses
              }}
              name="email" // Ensure consistent field name
            />
          <Button variant="contained" color="primary" onClick={signupB} sx={{ marginBottom: 2 }}>
            Signup
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Button variant="text" color="secondary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>
          <Typography variant="body2" sx={{ margin: '16px 0' }}>
            OR
          </Typography>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            text="signup_with"
            width="300px"
          />
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
}

