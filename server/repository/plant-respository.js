var collection;

const setup = async ({db}) => {
  if(!await db.listCollections({name: 'plants'}).next()){
    await db.createCollection('plants');
  }

  collection = db.collection('plants');
}

const insertOne = async ({data, user}) => {
  try{
    return {
      insertedCount, 
      insertedId
    } = await collection.insertOne({
      user: user,
      ...data 
    });
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

module.exports = {setup, insertOne};