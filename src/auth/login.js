import axios from 'axios';
import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useUser } from './context';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setUsername: setUser } = useUser();

 const API_URL = process.env.REACT_APP_API_URL

 
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const loginB = async () => {
    setIsLoading(true);
    if (!password || (!username && !email)) {
      setError('Username or email and password are required!');
      return;
    }
   
   
    try {
      console.log(`${API_URL}/api/login/`);
      const csrfToken = getCookie('csrftoken'); 
      const response = await axios.post(
        `${API_URL}/api/login/`, 
        // 'http://127.0.0.1:8000/api/login/',
        // 'http://localhost:8000/api/login',

        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRFToken': csrfToken }), 
          },
          withCredentials: true, 
        }
      );

      setUser(username); 
      setError('');
      setSuccess(`Welcome ${username}, Login successful! Redirecting to home...`);
      
      setTimeout(() => navigate('/home'), 3000);

      console.log('Login response:', response.data);
      setUsername('');
      setEmail('');
      setPassword('');

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google token:', credentialResponse.credential);
    try {
      const csrfToken = getCookie('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/api/google-login',
        { token: credentialResponse.credential },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRFToken': csrfToken }),
          },
          withCredentials: true,
        }
      );

      setUser(response.data.data.email);
      setError('');
      setSuccess('Google login successful! Redirecting to home...');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error('Google login error:', err.response?.data || err.message);
      setError(
        err.response?.data?.message || 'Google login failed.'
      );
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
    setError('Google Sign-In failed. Check console for details.');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
            Login
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
            error={error.includes('Username') || error.includes('required')}
            helperText={error.includes('Username') || error.includes('required') ? error : ''}
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
            InputProps={{ autoComplete: 'email' }}
            name="email"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2, width: '300px' }}
            error={error.includes('Password') || error.includes('required')}
            helperText={error.includes('Password') || error.includes('required') ? error : ''}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={loginB}
            disabled={isLoading}
            sx={{ marginBottom: 2 }}
          >
            {isLoading ? 'Logging...' : 'Login'}
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Don’t have an account?</Typography>
            <Button variant="text" color="secondary" onClick={() => navigate('/')}>
              Signup
            </Button>
          </Box>
          <Typography variant="body2" sx={{ margin: '16px 0' }}>
            OR
          </Typography>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            text="Login with Google"
            logo_alignment="left"
            style={{ width: '300px', marginBottom: '16px' }}
          />
          <Typography variant="body2" color="textSecondary" align="center">
            By logging in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </Typography>
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
}