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
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../auth/context';

export default function Delete() {
    const [recordId, setRecordId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { username } = useUser();
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

    const handleDelete = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!recordId) {
            showMessage(setError, 'Please enter a Record ID.');
            return;
        }

        setLoadingDelete(true);

        try {
            const csrfToken = getCookie('csrftoken');
            await axios.delete(
                `http://localhost:8000/api/records/${recordId}/`,
                {
                    headers: {
                        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
                    },
                    withCredentials: true,
                }
            );
            showMessage(setSuccess, 'Record deleted successfully!');
            setRecordId('');
        } catch (err) {
            showMessage(
                setError,
                err.response?.data?.detail ||
                err.response?.data?.error ||
                'Failed to delete record.'
            );
        } finally {
            setLoadingDelete(false);
        }
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
                        Delete a Blog Record
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                    Enter the Record ID you want to delete. This action is irreversible.
                </Typography>
                {(error || success) && (
                    <Fade in={!!(error || success)}>
                        <Alert severity={error ? 'error' : 'success'} sx={{ mb: 2, fontWeight: 500 }}>
                            {error || success}
                        </Alert>
                    </Fade>
                )}
                <Box component="form" onSubmit={handleDelete}>
                    <TextField
                        label="Record ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={recordId}
                        onChange={(e) => setRecordId(e.target.value)}
                        required
                        type="number"
                        helperText="Enter the numeric ID of the record to delete"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        disabled={loadingDelete || !recordId}
                        sx={{ mt: 2 }}
                    >
                        {loadingDelete ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Delete Record'
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
