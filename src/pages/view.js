import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Container,
    Fade,
} from '@mui/material';
import './Home.css';
import { useUser } from '../auth/context';

export default function View() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { username } = useUser();
    console.log('Current username:', username); // Debugging line to check username

    // Fetch posts from backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/records/', {
                    withCredentials: true, // Send sessionid cookie
                });
                setPosts(response.data); // Expect a list of posts
            } catch (err) {
                console.error('Fetch posts error:', err.response?.data || err.message);
                setError(
                    err.response?.data?.detail ||
                        'Failed to load posts. Please ensure you are logged in.'
                );
            }
        };
        fetchPosts();
    }, []);

    return (
        <Box
            className="home-container"
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
                py: 6,
            }}
        >
            {/* Hero Section */}
            <Box
                className="hero-section"
                sx={{
                    textAlign: 'center',
                    mb: 6,
                    py: 6,
                    background: 'linear-gradient(90deg, #a5b4fc 0%, #fbc2eb 100%)',
                    borderRadius: 6,
                    boxShadow: '0 8px 32px rgba(80, 80, 180, 0.10)',
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    className="hero-title"
                    sx={{
                        fontWeight: 800,
                        color: '#3730a3',
                        letterSpacing: 1,
                        mb: 2,
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    Welcome to Our Blog {username ? `, ${username}` : 'My Guest'}! ❤️
                </Typography>
                <Typography
                    variant="h6"
                    className="hero-subtitle"
                    sx={{
                        color: '#6d28d9',
                        fontWeight: 500,
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    Discover stories, ideas, and inspiration.
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        color: '#4f46e5',
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    Below are the posts created by users,<br /> to post your own, please navigate to the "Create" section.
                </Typography>
            </Box>
            {/* Posts Section */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 4 }}>
                        {error}
                    </Typography>
                )}
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Fade in timeout={600}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 5,
                                        boxShadow: '0 8px 32px rgba(80, 80, 180, 0.12)',
                                        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
                                        border: '1px solid #e0e7ff',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
                                        '&:hover': {
                                            transform: 'translateY(-12px) scale(1.03)',
                                            boxShadow: '0 16px 48px rgba(80, 80, 180, 0.18)',
                                            borderColor: '#a5b4fc',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'radial-gradient(circle at 80% 20%, #c7d2fe 0%, transparent 70%)',
                                            opacity: 0.25,
                                            pointerEvents: 'none',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, zIndex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 700,
                                                color: '#6366f1',
                                                fontFamily: 'Poppins, sans-serif',
                                            }}
                                        >
                                            {post.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            {post.body}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ mt: 2, display: 'block', fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            Posted on: {new Date(post.created_at).toLocaleDateString()}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontFamily: 'Poppins, sans-serif' }}
                                        >
                                            Author: {post.author}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, zIndex: 1 }}>
                                        <Button
                                            size="small"
                                            color="primary"
                                            sx={{
                                                borderRadius: 3,
                                                background: 'linear-gradient(90deg, #a5b4fc 0%, #fbc2eb 100%)',
                                                color: '#3730a3',
                                                fontWeight: 600,
                                                boxShadow: '0 2px 8px rgba(80, 80, 180, 0.10)',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #fbc2eb 0%, #a5b4fc 100%)',
                                                    color: '#6d28d9',
                                                },
                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}