import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";


export default function Header() {
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRUD Application
            </Typography>
            <Button color="inherit" href="/">
            View All
            </Button>
            <Button color="inherit" href="/create">
            Create
            </Button>
            <Button color="inherit" href="/read">
            Read
            </Button>
            <Button color="inherit" href="/update">
            Update
            </Button>
            <Button color="inherit" href="/delete">
            Delete
            </Button>
        </Toolbar>
        </AppBar>
    );
    }
