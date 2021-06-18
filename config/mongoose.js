// load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// define the mongoose configuration method
module.exports = function() {
	// use mongoose to connect to mongodb
	//const db = mongoose.connect(config.db);
	const db = mongoose.connect(config.db, {
		useunifiedtopology: true,
		usenewurlparser: true, usecreateindex: true 
		}).then(() => console.log('db connected!'))
		.catch(err => {
		console.log('error');
		});

	// load the model 
	require('../app/models/user.server.model');
	require('../app/models/fashionPost.server.model');

    var conn = mongoose.connection;

    //seed the database when it loads for the first time
    conn.once('open', function() {
        console.log("conn once")
        console.log(conn.collections.fashions.find({}));

        var FashionPost = mongoose.model('Fashion');

        var post1 = new FashionPost({
            style: 'afropunk',
            price:100,
            rating:100,
            brand:"Hugo Boss",
            size:"M",
            img: "afropunk.jpeg"
        });

        post1.save(function(err, post) {
            if(err) { console.log("post couldnt be created");}
            else { console.log("post seeded to the mongodb");}
        });

        var post2 = new FashionPost({
            style: 'bohemian',
            price:100,
            rating:100,
            brand:"Hugo Boss",
            size:"M",
            img: "boss-5.jpeg"
        });

        post2.save(function(err, post) {
            if(err) { console.log("post couldnt be created");}
            else { console.log("post seeded to the mongodb");}
        });

        var post3 = new FashionPost({
            style: 'afropunk',
            price:100,
            rating:100,
            brand:"Forever 21",
            size:"M",
            img: "forever-21-3.jpeg"
        });

        post3.save(function(err, post) {
            if(err) { console.log("post couldnt be created");}
            else { console.log("post seeded to the mongodb");}
        });
        var post4 = new FashionPost({
            style: 'afropunk',
            price:100,
            rating:100,
            brand:"Hugo Boss",
            size:"M",
            img: "boss-2.jpeg"
        });

        post4.save(function(err, post) {
            if(err) { console.log("post couldnt be created");}
            else { console.log("post seeded to the mongodb");}
        });
        var post5 = new FashionPost({
            style: 'afropunk',
            price:100,
            rating:100,
            brand:"Forever 21",
            size:"M",
            img: "foreever-21-1.jpeg"
        });

        post5.save(function(err, post) {
            if(err) { console.log("post couldnt be created");}
            else { console.log("post seeded to the mongodb");}
        });

    });

	// return the mongoose connection instance
	return db;
};
