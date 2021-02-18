var express = require('express');
var router = express.Router();

const MonkeyLearn = require('monkeylearn')

// Use the API key from your account
const ml = new MonkeyLearn('<YOUR API KEY HERE>')

// Classify some texts
let model_id = 'cl_pi3C7JiL'
// the full options are described in the docs: https://monkeylearn.com/api/v3/#classify
let data = [
    'Some text to classify',
    {
        text: 'You can also send text inside an object like this'
    },
    {
        text: 'And include an external id',
        external_id: '195619'
    }
]

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
