var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kzuza' });
});

router.get('/userHome', function(req, res) {
  res.render('userHome', { title: req.user.name.full , user: req.user });
});

module.exports = router;
