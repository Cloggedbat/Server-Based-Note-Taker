const { Router } = require("express");
// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path")
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes to pages 

app.get("/notes", function (req, res){
  res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
})

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "/Develop/public"));
})

app.get("*", function (req, res){
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
})


// these have been turned off for now 10/2

// require("./routes/apiRoutes")(app);



// "starts" our server


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});