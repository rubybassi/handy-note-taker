const express = require('express');
const path = require('path');

const app = express();
const port = process.env.port || 8000;

// HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log('listening on port:' , port));