var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/all', function(req, res, next) {
  db.query("select * from shopping_list", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/toGet', function(req, res, next) {
  db.query("select * from shopping_list where Buy=0", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/got', function(req, res, next) {
  db.query("select * from shopping_list where Buy=1", (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }
    res.send(result);
  });
});

router.get('/deleteProduct', function(req, res, next) {
  var sqlQuery = "delete from shopping_list where Item='cats'";
  db.query(sqlQuery, [req.body.item], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }

    res.render('./index');
  });
});

router.get('/update', function(req, res, next) {
  var sqlQuery = "update shopping_list set Item = 'donkey' where item = 'apple'";
  db.query(sqlQuery, [req.body.item], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }

    res.render('./index');
  });
});

router.get('/check', function(req, res, next) {
  var sqlQuery = "update shopping_list set Buy = 1 where item = 'hippos'";
  db.query(sqlQuery, [req.body.item], (error, result, fields) => {
    if (error) {
      res.status(500).send(error);
    }

    res.render('./index');
  });
});

router.post('/addProduct', function(req,res,next){
  var query = "INSERT INTO shopping_list (Item, Quanity, Buy) "
    +"VALUES ( ?, ?, 0);"
  var queryParams = [
    req.body.item,
    req.body.quantity
  ];

  db.query(query, queryParams, (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    //res.status(201).send('record added');
    //res.send(result);
    res.render('./index');
  });
});

module.exports = router;