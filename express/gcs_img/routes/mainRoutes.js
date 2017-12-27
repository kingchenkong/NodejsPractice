var express = require('express');
var router = express.Router();

//
var images = require('../public/javascripts/images');
var multer = require('multer')
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  // get img url
  var imgUrl_kong = req.GCS_getImgUrl('kong.png');
  console.log('routes: file_name:\n' + imgUrl_kong);

  // upload hosting.png 
  // req.GCS_uploadImg('./public/images/hosting.png');

  res.render('index', { title: 'Express', imgURL: imgUrl_kong });
});

router.get('/uploadPage', function (req, res, next) {
  res.render('uploadPage');
});

router.post('/uploadFile', upload.single('uploadingFile'), function (req, res, next) {

  console.log('req.body.title: ' + req.body.title);
  console.log('req.body.uploadingFile: ' + req.body.uploadingFile);
  console.log('req.files: ' + req.files);
  console.log('req.files.uploadingFile: ' + req.files.uploadingFile);

  var uploadedFile = req.files.uploadingFile;
  var tmpPath = uploadedFile.path;
  var targetPath = './' + uploadedFile.name;

  fs.rename(tmpPath, targetPath, function (err) {
    if (err) throw err;
    fs.unlink(tmpPath, function () {

      console.log('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
    });
  });
  res.send('file upload is done.');
  res.end();
});

// router.post('/add', images.multer.single('image'), images.sendUploadToGCS, (req, res, next) => {
//   router.post('/add', function(req, res, next) {
//   let data = req.body;

//   // Was an image uploaded? If so, we'll use its public URL
//   // in cloud storage.
//   if (req.file && req.file.cloudStoragePublicUrl) {
//     data.imageUrl = req.file.cloudStoragePublicUrl;
//   }

//   // Save the data to the database.
//   getModel().create(data, (err, savedData) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.redirect(`${req.baseUrl}/${savedData.id}`);
//   });
// });

module.exports = router;
