const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
const port = process.env.port || 8000;
// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware to serve CSS files and JavaScript files in the public directory
app.use(express.static("public"));

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.post('/api/notes', (req, res) => {
    console.log('req body:', req.body);
});


app.listen(port, () => console.log('listening on port:' , port));