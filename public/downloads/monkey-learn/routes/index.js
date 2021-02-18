var express = require('express');
const { RequestTimeout } = require('http-errors');
var router = express.Router();
const MonkeyLearn = require('monkeylearn')
require('dotenv').config()

// Use the API key from your account
const ml = new MonkeyLearn(process.env.API_KEY);

// Classify some texts
let model_id = process.env.MODEL_ID;
// the full options are described in the docs: https://monkeylearn.com/api/v3/#classify

let data = ['gaming laptop']


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/uploadData', function(req, res, next) {
  res.render('uploadData');
});

router.get('/classifier', function(req, res, next) {
  ml.classifiers.detail(model_id).then(response => {
    res.render('classifier', { data: response.body });
  }).catch(error => {
      console.log(error)
  })
});



router.post('/results', function(req, res ,next) {

  ml.classifiers.classify(model_id, [req.body.testText]).then(response => {
    res.render('result', { data: response.body });
  }).catch(error => {
      console.log(error);
      console.log(error.response);
  })
});

router.post('/upload', function(req, res ,next) {
  ml.classifiers.upload_data(model_id, [{
    text: req.body.dataText,
    tags: [req.body.dataTag]
  }]).then(response => {
      console.log(response.body);
      res.redirect('/');
  }).catch(error => {
      console.log(error)
  })
})

module.exports = router;
