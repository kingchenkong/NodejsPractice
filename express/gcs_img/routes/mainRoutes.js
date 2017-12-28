var express = require('express');
var router = express.Router();

//
var service_gcs = require('../library/service_GCS');
// var multer = require('multer')
// var multiparty = require('multiparty');
// var util = require('util');
// var fs = require('fs');
// var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  // get img url
  // var imgUrl_kong = req.GCS_getImgUrl('kong.png');
  var imgURL_kong = service_gcs.getPublicUrl('kong.png');
  console.log('routes: file_name:\n' + imgURL_kong);

  // upload hosting.png 
  // req.GCS_uploadImg('./public/images/hosting.png');

  res.render('index', { title: 'Express', imgURL: imgURL_kong });
});

router.get('/uploadPage', function (req, res, next) {
  res.render('uploadPage');
});

router.post('/uploadFile', service_gcs.multer.single('image'), service_gcs.sendUploadToGCS, (req, res, next) => {

  // Was an image uploaded? If so, we'll use its public URL
  // in cloud storage.
  if (req.file && req.file.cloudStoragePublicUrl) {
    req.body.imageUrl = req.file.cloudStoragePublicUrl;
  }

  // Save the data to the database.

  // getModel().create(data, (err, savedData) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   res.redirect(`${req.baseUrl}/${savedData.id}`);
  // });

  res.redirect('/');
});

module.exports = router;
