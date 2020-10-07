const Router = require("express");
// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
const fs = require("fs");
var path = require("path");
const { stringify } = require("querystring");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;


// static filess
// Sets up the Express app to handle data parsing
// Lets give this a try to get the css in turned on 

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/api/notes', function (req, res) {
  const dbGet = require('./db/db.json');
  res.json(dbGet);
});

// creating a path to db.json to save notes
// let data = [];
app.post("/api/notes", function (req, res) {
  var newJSON = require("./db/db.json");
  var newNote = req.body
  newNote.id = Date.now()
  newJSON.push(newNote)
  // res.json(newNote)
  // data.push(req.body)
  let myJSON = JSON.stringify(newNote)
  console.log(myJSON)
  fs.writeFile("./db/db.json", JSON.stringify(newJSON), function (err) {
    // console.log(err)
    if (err) {
      throw err;
    };
    res.json(newNote);
  });

});

app.delete("/api/notes/:id", function (req, res) {
  let dbdelete = require("./db/db.json");
  dbdelete = dbdelete.filter(function (note) {
    return note.id != req.params.id;

  });
  fs.writeFile("db/db.json", JSON.stringify(dbdelete), function (err) {
    if (err) {
      throw err;
    };
    res.json();
  });
});

//routes to pages 
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})







// "starts" our server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});