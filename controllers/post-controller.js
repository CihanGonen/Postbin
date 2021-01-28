const Post = require('../models/post-model');

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
          posts.forEach(function(post){
            console.log(post.number);
            post.time = getExactTime(Date.now()-Number(post.time));
          });
          const arrPosts = arrayReverseObj(posts);
          res.render('post-list',
          {title:'All Posts',posts:arrPosts,link:'/posts'});
        })
        .catch((err)=>{console.log(err)})  ;
};

exports.getPostPage = (req,res)=>{
  console.log(req.params.postid);
  const id = req.params.postid;
  Post.getById(id)
        .then(post=>{
          console.log(post);
          res.render('get-post',
          {title:post.subject,post,link:'/posts'});
        })
        .catch(err=>console.log(err));

};

arrayReverseObj = (obj) => {
  let newArray = []

  Object.keys(obj)
    .sort()
    .reverse()
    .forEach(key => {
      newArray.push( {
      '_id':obj[key]._id,
      'subject':obj[key].subject,
      'author':obj[key].author,
      'text':obj[key].text, 
      'time':obj[key].time,
      'number':obj[key].number
      })
    })
  return newArray  ;
}

getExactTime = (newTime)=>{

  let time = newTime;
  if(time/1000>1){
    time = time/1000;
    if(time/60>1){
      time = time/60;
      if(time/60>1){
        time = time/60;
        if(time/24>1){
          time = time/24;
          if(time/30>1){
            time = time/30;
            if(time/12>1){
              time=time/12;
              return time.toFixed(0)+' years';
            }
            else{
              return time.toFixed(0)+' months';
            }
          } 
          else{
            return time.toFixed(0)+' days';
          }
        }
        else{
          return time.toFixed(0)+' hrs.';
        }
      }
      else{
        return time.toFixed(0)+' mins.';
      }
    }
    else{
      return time.toFixed(0)+' secs.';
    }
  }
  else{
    return time.toFixed(0)+' ms.';
  }
};