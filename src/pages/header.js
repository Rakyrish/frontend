import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

const navItems = [
    { label: "Home", path: "/home" },
    
    { label: "Create", path: "/create" },
    { label: "Read", path: "/view" },
    { label: "Update", path: "/update" },
    { label: "Delete", path: "/delete" },
];



export default function Header() {
    const location = useLocation();

    return (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: "white", fontWeight: "bold" }}>
                    CRUD Application
                </Typography>
                {navItems.map((item) => (
                    <Button
                        key={item.path}
                        component={Link}
                        to={item.path}
                        sx={{
                            mx: 1,
                            color: location.pathname === item.path ? "#2575fc" : "white",
                            backgroundColor: location.pathname === item.path ? "white" : "transparent",
                            fontWeight: location.pathname === item.path ? "bold" : "normal",
                            borderRadius: 2,
                            "&:hover": {
                                backgroundColor: location.pathname === item.path ? "#e3e3e3" : "rgba(255,255,255,0.2)",
                                color: "#2575fc",
                            },
                            transition: "all 0.2s",
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}
