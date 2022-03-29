var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(`welcome to home page cookies are ${req.cookies.name}`);
});
router.get('/students', (req, res) => {
  let students = ['karuna', 'bindu', 'mounisha'];
  res.json(students);
});
router.get('/student', (req, res) => {
  let studentObj = { name: 'karuna', city: 'hyderabad' };
  res.json(studentObj);
});

module.exports = router;
