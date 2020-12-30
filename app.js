const express = require("express");
const fs = require("fs");
const path = require('path');
const uuid = require("uuid");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.urlencoded({
  extended: true
}))

var data = JSON.parse(fs.readFileSync("./db/db.json"));

// GET `/notes` - Should return the `notes.html` file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/notes.html'));
});


// Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./db/db.json"), (err, data) => {
   if (err) throw err;
   
   
})
});

// Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
  
  // console.info(req.body.title);
  // console.info(req.body.text);
  let newNote = req.body;
  newNote.id = uuid.v4();
  data.push(newNote)
  // read the incoming post body data
  let title = req.body.title;
  let text = req.body.text;
  data.push(newNote)
fs.writeFileSync("./db/db.json", JSON.stringify(data));
res.json(data)
  // read the original db.json content

  
  
    });



// Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req, res){
const deleteNote = data.filter((deletingNote) => deletingNote.id !== req.params.id);
fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
res.json(deleteNote)
});



// GET handle index.js requests
// app.get('/assets/js/index.js', (req, res) => {
//   res.sendFile(path.join(__dirname+'/public/assets/js/index.js'));
// });


// GET `*` - Should return the `index.html` file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});