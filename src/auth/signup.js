import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';


export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signupB = async () => {
    console.log("Signup clicked");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    try {
        
        if (!username || !email || !password ||!confirmPassword) {      
            setError("All fields are required!");
            return;
        }
        const response = await fetch("http://localhost:8000/api/reg", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: username,
            email: email,
            password1: password,
            password2: confirmPassword,
}),

        });
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        console.log("Response body:", await response.text());
        
        
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Signup failed!");
        } else {
          message.open({
           type: "success",
            content: "Signup successful! Please login.",
           });
         setTimeout(() => navigate("/home"), 1000);
          setUsername("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setError("");

           

        }
        
    } catch (error) {
        console.log("Error during signup:", error);
        setError("An error occurred during signup. Please try again.");
        
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        backgroundColor: "#f0f4f8", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff", 
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2, width: "300px" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2, width: "300px" }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: 2, width: "300px" }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2, width: "300px" }}
        />
        <Button variant="contained" color="primary" onClick={signupB}>
          Signup
        </Button>
        <Box sx={{ height: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Typography>Already have an account</Typography>
          <Button variant="text" color="secondary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}