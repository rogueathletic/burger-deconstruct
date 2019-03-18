var express = require("express");

var router = express.Router();
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  res.json({index: 'hit index route'})
  // // express callback response by calling burger.selectAllBurger
  // db.burger.all(function(burgerData) {
  //   // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
  //   res.render("index", { burger_data: burgerData });
  // });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for burger.addBurger
  db.burger.create(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function(req, res) {
  db.burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;


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