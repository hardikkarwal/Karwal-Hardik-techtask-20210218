let express = require('express');
let router = express.Router();
const fs = require('fs');
let http = require('http');
const unzipper = require('unzipper');
const fse = require('fs-extra');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET download page. */
router.get('/downloadData', function(req, res, next) {
  res.render('download');
});

router.post('/downloadRequest', function(req, res, next) {
  download(req.body.sourceURL, req.body.destinationURL, next)
  res.render('index');
});

function download (url, dest, cb) {
  let file = fs.createWriteStream(dest);
  http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

/* GET extract page. */
router.get('/extractData', function(req, res, next) {
  res.render('extract');
});

router.post('/ExtractRequest', function(req, res, next) {
  fs.createReadStream(req.body.sourceURL).pipe(unzipper.Extract({ path: req.body.destinationURL }));
  res.render('index');
});

/* GET execute page. */
router.get('/executeData', function(req, res, next) {
  res.render('execute');
});

router.post('/ExecuteRequest', function(req, res, next) {

  fse.copySync(req.body.sourceURL, req.body.destinationURL, function (err) {
    if (err) {                 
      console.log(err);     
    } else {
      console.log("success!");
    }
  });
});

module.exports = router;