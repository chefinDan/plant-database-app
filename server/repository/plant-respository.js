var collection;
const {ObjectId} = require('mongodb');

const setup = async ({db}) => {
  if(!await db.listCollections({name: 'plants'}).next()){
    await db.createCollection('plants');
  }

  collection = db.collection('plants');
}

const getAll = async (query) => {
  try{
    if(query._id){
      query._id = new ObjectId(query._id);
    }
    const cursor = await collection.find(query);
    return await cursor.toArray();
  }
  catch(e){
    throw(e);
  }  
}

const insertOne = async ({data, user}) => {
  try{
    const {
      insertedCount, 
      insertedId
    } = await collection.insertOne({
      user: user,
      ...data 
    });

    return insertedCount;
  }
  catch(e){
    throw(e);
  }
}

const insertMany = async ({data, user}) => {
  try{
    const userAdded = data.map(d => d.user = user);
    return {
      insertedCount,
      insertedIds
    } = await collection.insertMany(userAdded);
  }
  catch(e){
    throw(e);
  }
}

module.exports = {
  setup,
  getAll,
  insertOne, 
  insertMany
};