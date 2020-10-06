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

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Lets give this a try to get the css in turned on 

// static filess
// app.use(express.static("/public"));
app.use(express.static(__dirname + '/public'))



//routes to pages 

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// app.use("/", function (req, res){
//   res.sendFile(path.join(__dirname, "/public/css"));
// })

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})

let data = [];
app.post("/api/notes", function (req, res) {
  // var newNote = req.body;
  res.json(req.body)
 data.push(req.body)
  let myJSON = JSON.stringify(req.body)
  console.log(myJSON)
  fs.writeFile("Develop/db/db.json", myJSON, function (err) {
    if (err) {
      return (err);
    }
  })

})

// these have been turned off for now 10/2

// require("./routes/apiRoutes")(app);



// "starts" our server


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});