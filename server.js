const express = require("express");

// setting express server
const app = express();
const port = process.env.port || 8000;

// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware to serve CSS files and JavaScript files in the public directory
app.use(express.static("public"));

// mapping to routes folders
require("./routes/api")(app);
require("./routes/html")(app);

app.listen(port, () => console.log("listening on port:", port));