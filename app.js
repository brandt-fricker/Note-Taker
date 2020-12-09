const express = require("express");
const fs = require("fs");
const path = require('path');

var PORT = process.env.PORT || 3000;
var app = express();

// GET `/notes` - Should return the `notes.html` file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/notes.html'));
});

// GET `*` - Should return the `index.html` file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  //res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
  //....
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});