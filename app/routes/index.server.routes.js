const multer = require('multer');
const express = require('express');
const FashionPost = require('mongoose').model('Fashion');
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
    filename: function (req, file, cb) {
            cb(null, file.originalname)
      }
});
var upload = multer({ storage: storage });

const index = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function(app) {
    app.get('/', index.render);

    app.get('/home', index.home);

    app.get('/upload', index.renderUploadForm);

    app.post('/upload',upload.single('img') ,index.uploadForm);

    app.post('/upload/:postId',upload.single('img') ,index.updateImage);

    app.get('/get/:postId', index.displayPostById);
    app.get('/delete/:postId', index.renderDeleteForm);
    app.post('/delete/:postId', index.deletePostById);

    app.route('/update/:postId')
    .put(index.updatePostById)
    .post(index.updatePostById);

    app.post("/filter", index.filterPostByStyle);

    //app.param('postId', index.findPostById);
};

