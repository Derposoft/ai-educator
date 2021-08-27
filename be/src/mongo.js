const mongosecret = require('../secrets/mongodb_secret.json')
const { MongoClient } = require('mongodb');

const uri = mongosecret.URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

/*client.connect(err => {
  const collection = client.db(mongosecret.db).collection(mongosecret.collection)
  // perform actions on the collection object
  client.close()
});*/


var userdata = client.db(mongosecret.db).collection(mongosecret.collection)
