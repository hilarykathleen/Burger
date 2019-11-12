var connection = require("./connection.js");

var orm = {
    selectAll: function(tableInput, callback) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, [], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    insertOne: function(table, column, burgerInput, callback) {
      var queryString = "INSERT INTO ' + table + '(' + column + ') VALUES (?)";
      console.log(queryString);
      connection.query(queryString, [burgerInput], function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    updateOne: function(table, col, colVal, condition, conditionVal, callback) {
      var queryString = "UPDATE ' + table + ' SET ' + col + '=?' + 'WHERE ' + condition + '=?";
        connection.query(queryString,[colVal, conditionVal],function(err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    }
  };
  
  module.exports = orm;