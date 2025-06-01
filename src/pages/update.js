import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Fade,
    Divider,
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    const [recordId, setRecordId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [step, setStep] = useState(1); // 1: enter ID, 2: edit form
    const navigate = useNavigate();
    const timerRef = useRef();

    
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    
    const showMessage = (setter, msg) => {
        setter(msg);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setter(null), 3000);
    };

    const getRecord = async () => {
        if (!recordId) {
            showMessage(setError, 'Please enter a Record ID.');
            return;
        }
        setLoadingFetch(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.get(`http://localhost:8000/api/records/${recordId}/`, {
                withCredentials: true,
            });
            setTitle(response.data.title);
            setBody(response.data.body);
            setStep(2);
            showMessage(setSuccess, 'Record loaded! You can now edit.');
        } catch (err) {
            showMessage(
                setError,
                err.response?.data?.detail ||
                'Failed to fetch record. Please ensure the ID is valid and you are logged in.'
            );
        } finally {
            setLoadingFetch(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!title.trim() || !body.trim()) {
            showMessage(setError, 'Title and body are required.');
            return;
        }

        setLoadingUpdate(true);

        try {
            const csrfToken = getCookie('csrftoken');
            await axios.put(
                `http://localhost:8000/api/records/${recordId}/`,
                { title, body },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
                    },
                    withCredentials: true,
                }
            );
            showMessage(setSuccess, 'Record updated successfully!');
            setTimeout(() => {
                setStep(1);
                setRecordId('');
                setTitle('');
                setBody('');
            }, 3000);
        } catch (err) {
            showMessage(
                setError,
                err.response?.data?.detail ||
                err.response?.data?.error ||
                'Failed to update record.'
            );
        } finally {
            setLoadingUpdate(false);
        }
    };

    const handleBack = () => {
        setStep(1);
        setTitle('');
        setBody('');
        setSuccess(null);
        setError(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
                padding: 4,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    backgroundColor: '#fff',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        size="small"
                        sx={{ minWidth: 0, p: 0.5 }}
                    />
                    <Typography variant="h5" sx={{ flex: 1, textAlign: 'center' }}>
                        Update a Blog Record
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                    {step === 1
                        ? 'Enter the Record ID you want to update. Click "Load Record" to fetch its details.'
                        : 'Edit the fields below and click "Update Record" to save changes.'}
                </Typography>
                {(error || success) && (
                    <Fade in={!!(error || success)}>
                        <Alert severity={error ? 'error' : 'success'} sx={{ mb: 2, fontWeight: 500 }}>
                            {error || success}
                        </Alert>
                    </Fade>
                )}
                {step === 1 && (
                    <Box component="form" onSubmit={e => { e.preventDefault(); getRecord(); }}>
                        <TextField
                            label="Record ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={recordId}
                            onChange={(e) => setRecordId(e.target.value)}
                            required
                            type="number"
                            helperText="Enter the numeric ID of the record to update"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loadingFetch || !recordId}
                            onClick={getRecord}
                            sx={{ mt: 2 }}
                        >
                            {loadingFetch ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Load Record'
                            )}
                        </Button>
                    </Box>
                )}
                {step === 2 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <form onSubmit={handleUpdate}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                helperText="Edit the title of your blog post"
                            />
                            <TextField
                                label="Body"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                                multiline
                                rows={4}
                                helperText="Edit the content of your blog post"
                            />
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                    fullWidth
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loadingUpdate}
                                >
                                    {loadingUpdate ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Update Record'
                                    )}
                                </Button>
                            </Stack>
                        </form>
                    </>
                )}
            </Box>
        </Box>
    );
}