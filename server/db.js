const MongoClient = require('mongodb').MongoClient;
const {userRepository, plantRepository} = require('./repository');

const setup = async ({uri, name}) => {
  MongoClient.connect(
    uri, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, 
    async (err, client) => {
      if(err){
        console.log(err)
      }
  
      db = client.db(name);

      await userRepository({db: db});
      await plantRepository({db: db});
    }
  );
}

module.exports = setup;