var express = require('express');
var router = express.Router();
const MonkeyLearn = require('monkeylearn')
require('dotenv').config()

// Use the API key from your account
const ml = new MonkeyLearn(process.env.API_KEY);

// Classify some texts
let model_id = process.env.MODEL_ID;
// the full options are described in the docs: https://monkeylearn.com/api/v3/#classify

let data = [
  'macbook i5 gaming',
]

let data = [
    'Some text to classify',]

ml.classifiers.classify(model_id, data).then(response => {
        // handle response
        console.log(response)
        console.log(response.body)
    }).catch(error => {
        // handle error
        console.log(error)
        // if an error is thrown during the request
        // it will also contain the (failure) response
        console.log(error.response)
    })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
