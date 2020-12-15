const express = require("express");
const fs = require("fs");
const path = require('path');

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.urlencoded({
  extended: true
}))


// GET `/notes` - Should return the `notes.html` file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/notes.html'));
});


// Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let final = JSON.parse(data);
    console.info(final);
    res.json(final);
  });

});

// Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
  
  console.info(req.body.title);
  console.info(req.body.text);

  // read the incoming post body data
  let title = req.body.title;
  let text = req.body.text;

  // read the original db.json content

  fs.readFile('./db/db.json', (err, data) => {

    if (err) throw err;
    let notes_arr = JSON.parse(data);

    // add/append/push the new note onto the end of the json data structure
    // current structure in db.json file: {"title":"Test Title2","text":"Test text2"}
    let new_note = {"title": title, "text": text};
    notes_arr.push(new_note);
    console.log(notes_arr)

    // save the updated data structure back to db.json
    fs.writeFile("./db/db.json", JSON.stringify(notes_arr), (err, data) => {

      if (err) throw err;
      
      // return the new note
      res.json(notes_arr)
  
    });

  });

});

// Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req, res) {
  
  
}); 

// GET handle index.js requests
app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/assets/js/index.js'));
});


// GET `*` - Should return the `index.html` file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});