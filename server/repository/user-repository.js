var collection;

const setup = async ({db}) => {
  if(!await db.listCollections({name: 'users'}).next()){
    await db.createCollection('users');
  }

  collection = db.collection('users');
}

module.exports = setup;