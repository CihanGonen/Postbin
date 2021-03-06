const PostMethods = require('../repositories/postRepository')

class Post{

  constructor(subject,author,text){
    this.subject = subject;
    this.author = author;
    this.text = text;
    this.time = Date.now().toString();
    this.age=0;
    this.number=0;
  }

    savePost = PostMethods.savePost;
    static getAll = PostMethods.getAll;
    static getById = PostMethods.getById;
  
}

module.exports = Post;