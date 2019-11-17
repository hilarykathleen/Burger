// Require packages
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var connection = require("./config/connection")
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./controllers/burgers_controller.js");
app.use(routes);

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
      if (err) {
        return res.status(500).end();
      }
   console.log(data);
      res.render("index", { burgers: data });
    });
  });

  // Update a quote by an id and then redirect to the root route.
// app.put("/api/quotes/:id", function (req, res) {
//     connection.query(
//       "UPDATE quotes SET author = ?, quote = ? WHERE id = ?",
//       [req.body.author, req.body.quote, req.params.id],
//       function (err, result) {
//         if (err) {
//           // If an error occurred, send a generic server failure
//           return res.status(500).end();
//         }
//         else if (result.changedRows === 0) {
//           // If no rows were changed, then the ID must not exist, so 404
//           return res.status(404).end();
//         }
//         res.status(200).end();
  
//       }
//     );
//   });

// app.post('/update/:id', (req,res)=>{
//     console.log("post is working")
// })

// Update a quote by an id and then redirect to the root route.
app.put("/update/:id", function (req, res) {
    connection.query(
              "UPDATE quotes SET burger_name = ?, devoured = ? WHERE id = ?",
              [req.body.burger_name, req.body.devoured, req.params.id],
              function (err, result) {
                if (err) {
                  // If an error occurred, send a generic server failure
                  return res.status(500).end();
                }
                else if (result.changedRows === 0) {
                  // If no rows were changed, then the ID must not exist, so 404
                  return res.status(404).end();
                }
                res.status(200).end();
          
              }
            );
console.log("updated message");
  });

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
