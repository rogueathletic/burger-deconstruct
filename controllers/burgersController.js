var express = require("express");
var db = require("../models");

module.exports = function (router) {

  // <----  get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

  // <----  GET route for getting all of the todos
  router.get("/burgers", function (req, res) {

    // <----  findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function (results) {
      // <----  We have access to the bgerss as an argument inside of the callback function
      res.json(results);
    });
  });

  // <----  POST route for saving a new bgers. We can create a bgers using the data on req.body
  router.post("/bgers/create", function (req, res) {
    console.log(req.body);

    db.Burger.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function (dbBurgers) {
      res.json(dbBurgers);
    });
  });

  // <----  DELETE route for deleting Burgerss. We can access the ID of the Burgers to delete in
  // <----  req.params.id
  router.delete("/Burgers/:id", function (req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.end();
    });
  });



  // <----  PUT route for updating Burgerss. We can access the updated Burgers in req.body
  router.put("/burgers/:id", function (req, res) {
    db.Burger.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbBurgers) {
        res.json(dbBurgers);
    });
  });
  return (router);
};



