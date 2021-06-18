const newUser = {
    firstName: 'abhishek',
    lastName: 'raturi',
    username: "araturi",
    password: 'Raturi!998',
    email: 'araturi@my.centennialcollege.ca'
};

const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/mean-development',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should delete an user from mongodb', async () => {
    const users = db.collection('users');
  
    //delete the document with username: newUser.username ('araturi')
    await users.deleteMany({username:newUser.username});
  
    const deletedUser = await users.findOne({username:'araturi'});
    expect(deletedUser).toBeNull();
  });

it('should insert a user into mongodb', async () => { const users = db.collection('users');
  
    await users.insertOne(newUser);
  
    const insertedUser = await users.findOne({username:'araturi'});
    expect(insertedUser).toEqual(newUser);
  });

  it('should update an user name', ()=> {
    const users = db.collection('users');

   users.update({username:newUser.username}, {username:'trentMinia'}, (err, user) =>{
        if(err) { expect(user).toBeNull(); }
        else {
            expect(true).toBeEqual(true);
        }
    } );

  });

});