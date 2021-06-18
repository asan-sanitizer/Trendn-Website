const FashionPost = require('mongoose').model('Fashion');

// Create a new 'render' controller method
exports.render = function(req, res) {
    console.log("User Logged in ", req.user)

    FashionPost.find({})
    .sort("rating")
    .exec(function(err,posts) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('index', {
                userFullName: req.user ? req.user.username : '',
                "post": posts
            });
        }
    });
};

exports.home = function(req, res) {
    FashionPost.find({}, (err, list) => {
        console.log(list[0])
        res.render("home", {
            "post": list,
            "userFullName": req.user ? req.user.username : ' '
        });
    });
};

exports.findPostById = function(req, res, next, postId) {
    console.log("FindPostById")
    console.log(req.params)
    FashionPost.findOne({
        _id: postId
    }, function(err, post) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            req.post = post;
            console.log("Found post (findPostById)", post);
            next();
        }
    });
};

exports.renderUploadForm = function(req, res) {
    res.render('upload-fashion-post', {
        userFullName: req.user ? req.user.username : ' '
    });
};

exports.uploadForm = function(req, res) {
    console.log("Req : ", req);

    const fashion = new  FashionPost();

    fashion.price = req.body.price;
    fashion.category = req.body.category;
    fashion.brand = req.body.brand;
    fashion.quantity = req.body.quantity;
    fashion.rating = req.body.rating;
    fashion.size = req.body.size ;
    fashion.style = req.body.style ;

    fashion.img = req.file.originalname;
    console.log("New Fashion Post", fashion);
    fashion.save();

    res.redirect('/home');
};

let file= { };
exports.updateImage = function(req,res) {
    file = req.file;
    console.log(file);
}

exports.displayPostById = function(req, res) {
    // Use the 'response' object to send a JSON response
    console.log( "DisplayPostById " ,req.params.postId);

    FashionPost.findOne({
        _id: req.params.postId
    }, function(err, post) {
        if (err) {
            console.log("cannot find one ");
        } else {
            res.render("edit", {
                "post": post
            })
        }
    });
};

exports.updatePostById = function (req, res, next) {
    console.log("Request file " , file);
    console.log("request body ", req.body);
    console.log("request params ", req.params);

    console.log("UpdatePostById ", req.params.postId);

    let query = {"_id": req.params.postId};

    req.body.img = file.originalname;

    // Use the 'Task' static 'findOneAndUpdate' method 
    // to update a specific task by task id
    FashionPost.findOneAndUpdate(query,  req.body , (err, task) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log("post " ,task);

            // Use the 'response' object to send a JSON response
            res.redirect('/home'); //display all tasks
        }
    });
};

exports.renderDeleteForm = function(req,res) {
    console.log( "Delete Post By ID" ,req.params.postId);

    FashionPost.findOne({
        _id: req.params.postId
    }, function(err, post) {
        if (err) {
            console.log("cannot find one ");
        } else {
            res.render("delete", {
                "post": post
            })
        }
    });
}

//update a survey by survey id
exports.deletePostById = function(req, res) {
    console.log("Delete post ", req.params.postId);
    FashionPost.remove({_id: req.params.postId}, function(err,post){
        if(err) { 
            console.log("err");
        }
        else {
            console.log("post deleted ");
            res.redirect('/home');
        }
    });
};

exports.renderUpdate = function(req, res) {
    console.log("Render Update ");
    res.render('editpost', {
        userFullName: req.user ? req.user.username : ' '
    });
    FashionPost.find({}, (err, list) => {
        console.log(list[0])
        res.render("editpost", {
            "post": list,
            "userFullName": req.user ? req.user.username : ' '
        });
    });
};


exports.filterPostByStyle = function(req,res) {
    console.log(" Req Body", req.body);
    var filter = req.body.filter.toLowerCase();
    console.log("Filter ", filter)

    FashionPost.find({
       style: filter
    }, function(err, post) {
        if (err) {
            console.log("cannot find one ");
        } else {
            console.log("Post found against filter ", post);
            res.render("home", {
                "post": post
            })
        }
    });
}
