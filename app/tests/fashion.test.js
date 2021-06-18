const newPost = {
    category: 'afropunk',
    brand: 'Hugo Boss',
    price: 100,
    rating:100,
    quantity:1 ,
    size: 'S',
    img: 'boss-1.jpeg',
};

const { MongoClient } = require('mongodb');

describe('insert', () => {
    let connection;
    let db;
    
    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost/mean-development', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db = await connection.db();
});

afterAll(async () => {
    await connection.close();
});

it('should delete an user from mongodb', async () => {
    const fashions = db.collection('fashions');
    
    //delete the document with username: newUser.username ('araturi')
    await fashions.deleteMany({ category: newPost.category});
    const deletedPost = await fashions.findOne({ category:newPost.category });
    expect(deletedPost).toBeNull();
});

it('should insert a user into mongodb', async () => {
    const fashions = db.collection('fashions');
    await fashions.insertOne(newPost);
    const insertedPost = await fashions.findOne({ category: newPost.category });
    expect(insertedPost).toEqual(newPost);
});

it('should update an user name', () => {
    const fashions= db.collection('fashions');
    fashions.update({ category: newPost.category}, { price: 200 }, (err, fashion ) => {
        if (err) { expect(fashion).toBeNull(); }
        else {
            expect(true).toBeEqual(true);
        }
    });
    
});

});