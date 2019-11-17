var connection = require("./connection.js");

var orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, [cb], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    insertOne: function(table, column, burgerInput, cb) {
      var queryString = "INSERT INTO ' + table + '(' + column + ') VALUES (?)";
      console.log(queryString);
      connection.query(queryString, [table, column, burgerInput, cb], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    updateOne: function(table, col, colVal, condition, conditionVal, cb) {
      var queryString = "UPDATE ' + table + ' SET ' + col + '=?' + 'WHERE ' + condition + '=?";
        connection.query(queryString,[table, col, colVal, condition, conditionVal, cb], function(err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    }
  };
  
  module.exports = orm;