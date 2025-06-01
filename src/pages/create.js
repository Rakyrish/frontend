import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Button,
    TextField,
    Alert,
    Paper,
    CircularProgress,
    Fade,
} from '@mui/material';

export default function Create() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    // Utility to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!title.trim() || !content.trim()) {
            setError('Title and Content are required.');
            return;
        }

        setLoading(true);
        try {
            const csrfToken = getCookie('csrftoken');
            await axios.post(
                `${API_URL}/api/records/`,
                { title, body: content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
                    },
                    withCredentials: true,
                }
            );
            setTitle('');
            setContent('');
            setError(null);
            setSuccess(' 👌💕😉 Congratulations! You have successfully added a post. View it at the "View All" tab. Gracias from john mbugua');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f5f6fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, sm: 4 },
                    width: { xs: '100%', sm: 450 },
                    maxWidth: '95vw',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        color: 'primary.main',
                        mb: 2,
                    }}
                >
                    Create New Record
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled={loading}
                        autoFocus
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        margin="normal"
                        disabled={loading}
                        inputProps={{ maxLength: 2000 }}
                    />
                    <Box sx={{ mt: 3, position: 'relative' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                py: 1.2,
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Fade in={loading} unmountOnExit>
                            <CircularProgress
                                size={28}
                                sx={{
                                    color: 'primary.main',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-14px',
                                    marginLeft: '-14px',
                                    zIndex: 1,
                                }}
                            />
                        </Fade>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}