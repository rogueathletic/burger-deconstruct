var express = require("express");
var router = express.Router();
var db = require("../models");
var script = require("../public/assets/js/script");

module.exports = function (router) {

  // <----  get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

  // <----  GET route for getting all of the todos
  router.get("/burgers", function (req, res) {

    // <----  findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function (results) {

      res.render("index", {
        burger_data: results
      });
    });
  });

  // <----  POST route for saving a new bgers. We can create a bgers using the data on req.body
  router.post("/burgers/create", function (req, res) {
      db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function (dbBurgers) {
      res.redirect('/');
    });
  });

  // <----  DELETE route for deleting Burgerss. We can access the ID of the Burgers to delete in
  // <----  req.params.id
  router.destroy ("/burgers/:id", function (req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbBurger) {
      res.json('/');
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
      .then(function(dbBurger) {
        res.json(dbBurger);
    });
  });
  return (router);
};



