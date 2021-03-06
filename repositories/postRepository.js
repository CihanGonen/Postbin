const getDb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class PostMethods{
  static savePost(){
    const db = getDb();
    return db.collection('posts')
        .insertOne(this)
        .then(result=>{
          console.log(result);
        })
        .catch(err=>{console.log(err)});
  }
  static getAll(){
    const db = getDb();
    return db.collection('posts')
        .find()
        .toArray()
        .then(posts=>{
          return posts;
        })
        .catch(err=>console.log(err));
  }
  static getById(postid){
    const db = getDb();
    return db.collection('posts')
                .findOne({_id:new mongodb.ObjectID(postid)})
                .then(post=>{
                  return post;
                })
                .catch(err=>{
                  console.log(err);
                })
  }
}



module.exports = PostMethods; 