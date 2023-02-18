var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.locals.tags = ['work',' lifestyle', 'motor','mobile'];

  res.render('index');
});


// GET /tags 
router.get('/tags', function(req, res, next) {
  res.locals.tags = ['work',' lifestyle', 'motor','mobile'];

  res.render('tags');
});



module.exports = router;


