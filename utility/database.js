const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
  // MongoClient.connect('mongodb://localhost/post-app') yerel server üzerinden bağlantı
  MongoClient.connect
  ('mongodb+srv://cihangonen:XPSM0jYOqmyKZ0WP@cluster0.fqhjr.mongodb.net/post-app?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true})
  .then(client =>{
    console.log('connected');
    _db = client.db();
    callback(client);
  })
  .catch(err=>{
    console.log(err);
    throw err;
  });
};

const getdb = ()=>{
  if(_db){
    return _db;
  }
  else{
    throw 'No Database';
  }
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;