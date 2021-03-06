const Post = require('../models/post-model');
const Myfuncs = require('../utility/functions');

exports.getIndex = (req,res)=>{
  res.render('post',{title:'Post',action:req.query.action,link:'/'});
};

exports.postPost = (req,res)=>{

  const subject = req.body.subject;
  const author = req.body.author;
  const text = req.body.text;
  const post = new Post(subject,author,text);
  post.savePost()
        .then(result=>{
          res.redirect('/?action=insert');
        })
        .catch(err=>{
          console.log(err);
        });
};

exports.getPost = (req,res)=>{
  Post.getAll()
        .then(posts=>{
          const postsWithAgeSortedNumberAttached = posts.map((post)=>{ post.age = Date.now()-Number(post.time);
                                                            return post;})
                                                        .sort((a,b) => a.age - b.age)
                                                        .map(post => {post.age = Myfuncs.getExactTime(post.age)  
                                                                          return post})
                                                        .map((post,i)=>{i%2==0 ? post.number=0 : post.number=1 
                                                                          return post});
          res.render('post-list',
          {title:'All Posts',posts:postsWithAgeSortedNumberAttached,link:'/posts'});
        })
        .catch((err)=>{console.log(err)})  ;
};

exports.getPostPage = (req,res)=>{
  const id = req.params.postid;
  (async()=>{
    try{
      const post = await Post.getById(id);
      res.render('get-post',{title:post.subject,post,link:'/posts'});
    }catch(err){
      console.log(err);
    }
  })();    
};
