var collection;

const setup = async ({db}) => {
  if(!await db.listCollections({name: 'plants'}).next()){
    await db.createCollection('plants');
  }
  
  collection = db.collection('plants');
}

module.exports = setup;