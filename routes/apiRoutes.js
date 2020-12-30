const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

module.exports = function(app) {

    app.get("/api/notes", function(req, res){
    //    res.json(db);
    res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    
     app.post("/api/notes", function(req, res){
       const note = JSON.parse(fs.readFileSync("./db/db.json"));
       const newNote = req.body;
       newNote.id = uuid.v4();
       note.push(newNote);
       fs.writeFileSync("./db/db.json", JSON.stringify(note));
       res.json(note);
     });

     app.delete("/api/notes/:id", function(req, res){
        const note = JSON.parse(fs.readFileSync("./db/db.json"));
        const filterNote = note.filter((n) => n.id !== req.params.id);
        fs.writeFileSync("./db/db.json", JSON.stringify(filterNote));
        res.json(note);
     })
    };