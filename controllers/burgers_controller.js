// Inside the `burgers_controller.js` file, import the following:

//    * Express
//    * `burger.js`

// 4. Create the `router` for the app, and export the `router` at the end of your file.
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get('/', function(req, res){
    //create an object that holds information from both the burger and menu table
    var info = {
      brgr: [],
      itm: []
    };
    //grab data from burger table
    burger.selectAll(function(data){
      for(var i=0;i<data.length; i++){
        info.brgr.push(data[i]);
      }
       //grab data from menu table
      burger.getMenu(function(data){
        for(var i=0;i<data.length; i++){
          info.itm.push(data[i]);
        }
        //send it all to the index.handlebars
        res.render('index', info);
      });    
    });
  });

  router.get('/menu', function(req, res){
    burger.getMenu(function(data){
      res.render('restaurantMenu', { itm: data });
    });
  });
  
  router.post('/create', function(req, res){
    burger.insertOne([req.body.burgerInput], function(){
      res.redirect('/');
    });
  });
  
  router.put('/update/:id', function(req, res){
    burger.updateOne([req.body.devoured], [req.params.id], function(){
      res.redirect('/');
    });
  });
  
  module.exports = router;