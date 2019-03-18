var express = require("express");

var db = require("../models");



module.exports = function (router) {

  // get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

  // GET route for getting all of the todos
  router.get("/burgers", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function (results) {
      // We have access to the Burgerss as an argument inside of the callback function
      res.json(results);
    });
  });

  // POST route for saving a new Burgers. We can create a Burgers using the data on req.body
  router.post("/Burgers/create", function (req, res) {
    console.log(req.body);

    db.Burgers.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function (dbBurgers) {
      res.json(dbBurgers);
    });
  });

  // DELETE route for deleting Burgerss. We can access the ID of the Burgers to delete in
  // req.params.id
  router.delete("/api/Burgers/:id", function (req, res) {
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.end();
    });
  });



  // PUT route for updating Burgerss. We can access the updated Burgers in req.body
  router.put("/burgers/:id", function (req, res) {
    db.Burgers.update({
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





// router.get("/burgers", function(req, res) {
//   res.json({index: 'hit index route'})
//   // // express callback response by calling burger.selectAllBurger
//   // db.burger.all(function(burgerData) {
//   //   // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
//   //   res.render("index", { burger_data: burgerData });
//   // });
// });

// // post route -> back to index
// router.post("/burgers/create", function(req, res) {
//   // takes the request object using it as input for burger.addBurger
//   db.burger.create(req.body.burger_name, function(result) {
//     // wrapper for orm.js that using MySQL insert callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     res.redirect("/");
//   });
// });

// // put route -> back to index
// router.put("/burgers/:id", function(req, res) {
//   db.burger.update(req.params.id, function(result) {
//     // wrapper for orm.js that using MySQL update callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     // Send back response and let page reload from .then in Ajax
//     res.sendStatus(200);
//   });
// });

// module.exports = router;


// exports.findUser = (req, res, next) =>{
//   let email = req.params.email
//   db.Burger.findOne({
//     where : {
//       email: email
//     }
//   }).then((user) => {
//     if(burger == null){
//       return res.status(401).json({msg:"Invalid Email"})
//     }else{
//       req.user = user
//       next()
//   }
//   }).catch((err) => {
//     return res.status(401).json({msg:err}) 
//   })
// }