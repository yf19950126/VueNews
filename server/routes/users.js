var express = require('express');
var multer = require('multer');
var app = express();
var router = express.Router();
//连接数据库的文件
var db = require('../model/db');
//将User表引入进来
var User = require('../model/User');
var Article = require('../model/Article');
var Essay = require('../model/Essay');
var Push = require("../model/Push");
var Comment = require("../model/Comment");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var storage = multer.diskStorage({
	destination: "www/imgs",
	filename: function(req, res, cb) {
		var username = req.cookies.username;
		cb(null, username + ".jpg");
	}
});
app.use(express.static("www"))
var upload = multer({
	storage
});
//用户注册
router.post('/register',function(req,res,next){
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.name = req.body.name;
  newUser.phone = req.body.phone;
  newUser.email = req.body.email;
  newUser.age = req.body.age;
  newUser.pass = req.body.pass;
  console.log(req.body);
  //判断一下如果，数据库单中存在相同的username,让用户重新填写
  User.findOne({'username':req.body.username},function(err,user){
    if(user){
      return res.json({
        status:'1',
        message:'用户名相同，无法进行注册'
      })
    }else{
      newUser.save().then(data=>{
        return res.json({
          status:'0',
          message:"success"
        })
      }).catch(err=>{
        return res.json({
          status:'1',
          message:err
        })
      })
    }
  })
})

// 登录
// 设置登录session
router.post('/login',(req,res)=>{
  console.log(req.body)
  let username = req.body.username;
  let pass = req.body.pass;
  User.findOne({username}).then(user=>{
    if(user){
      if(pass === user.pass){
        res.cookie('username',username,{
          maxAge: 7*24*3600*1000
        })
        return res.status(200).json({
          status: 1,
          msg: "登录成功"
        });
      }else if(pass != user.pass){
        return res.json({
          status: 0,
          msg: "密码错误"
        });
      }
    }else{
      return res.json({
        status:0,
        msg:'您的账号或者密码有误！'
      })
    }
  })
})

//判断cookie
router.post('/cookie',function (req,res) {
  // console.log(req.cookies.username);
  res.send({code:1,data:req.cookies.username});

})

//登出接口
router.post("/logout", function (req,res) {
  res.cookie("username","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});
// 获取
router.get('/list',(req,res)=>{
  let username = req.cookies.username;
  User.findOne({username}).then(user=>{
    return res.send(user)
  })
})

// 修改
router.post('/update',function(req,res,next){
  console.log(req.body)
  let name = req.cookies.username;
  User.findOne({username:name}).then(user=>{
    user.username = req.body.username;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.age = req.body.age;
    user.save().then(data=> {
        return res.json({
            status:'0',
            message:'success'
        })
    }).catch(err=>{
        return res.json({
            status:'1',
            message:err
        });
    })
  })
})

// 添加关注
router.post('/addArticle',function(req,res,next){
  console.log(req.body)
  Article.username=req.cookies.username;
  Article.findOne({name:req.body.articleName},function(err,article){
    if(article){
      return res.json({
        status:'1',
        message:'你已经关注过该作者'
      })
    }else{
      Article.create({name:req.body.articleName,url:req.body.articleUrl,username:req.cookies.username}).then(data=>{
        return res.json({
          status:'0',
          message:"关注成功"
        })
      }).catch(error=>{
        return res.json({
          status:'1',
          message:error
        })
      })
    }
  })
})

//显示用户关注的作者
router.post('/list',(req,res)=>{
  // console.log(req.body)
  Article.find({username:req.cookies.username}).then(data=>{
    return res.send(data)
  }).catch(err=>{
    console.log(err)
  })
})

//取消关注该作者
router.post('/deleteUsers',function (req,res) {
  Article.remove({_id:req.body.params._id}).then(result=>{
    return res.status(200).json({message:'取消关注成功',code:1})
  }).catch(err=>{
    console.log(err)
  })
});

//收藏文章
router.post('/ConnectArticle',function(req,res,next){
  console.log(req.body)
  // 用户cookie
  Essay.username=req.cookies.username;
  Essay.findOne({title:req.body.essayTitle},function(err,essay){
    if(essay){
      return res.json({
        status:'1',
        message:'你已经收藏了该文章'
      })
    }else{
      Essay.create({title:req.body.essayTitle,tid:req.body.tid,url:req.body.essayUrl,username:req.cookies.username}).then(data=>{
        return res.json({
          status:'0',
          message:"收藏成功"
        })
      }).catch(error=>{
        return res.json({
          status:'1',
          message:error
        })
      })
    }
  })
})
//显示用户收藏的文章
router.post('/essayList',(req,res)=>{
  // console.log(req.body)
  Essay.find({username:req.cookies.username}).then(data=>{
    return res.send(data)
  }).catch(err=>{
    console.log(err)
  })
})
//取消收藏文章
router.post('/deleteEssay',function (req,res) {
  Essay.remove({_id:req.body.params._id}).then(result=>{
    return res.status(200).json({message:'取消收藏成功',code:1})
  }).catch(err=>{
    console.log(err)
  })
});

// 发表文章
// router.post('/pushArticle',function(req,res,next){
//   var newPush = new Push();
//   newPush.title = req.body.title;
//   newPush.author = req.body.author;
//   newPush.content = req.body.content;
//   newPush.username=req.cookies.username;
//   console.log(req.body);
//   newPush.save().then(data=>{
//     return res.json({
//       status:'0',
//       message:"发表成功"
//     })
//   }).catch(err=>{
//     return res.json({
//       status:'1',
//       message:err
//     })
//   })
// })
//显示用户发表的文章
router.post('/pushlist',(req,res)=>{
  // console.log(req.body)
  Push.find().then(data=>{
    return res.send(data)
  }).catch(err=>{
    console.log(err)
  })
}) 

// 评论
router.post('/CommentArticle',function(req,res,next){
  console.log(req.body)
  Comment.username=req.cookies.username;
  Comment.create({title:req.body.CommentTitle,url:req.body.CommentUrl,content:req.body.content,username:req.cookies.username,tid:req.body.tid}).then(data=>{
    return res.json({
      status:'0',
      message:"评论成功"
    })
  }).catch(error=>{
    return res.json({
      status:'1',
      message:error
    })
  })
  })
  // 用户评论的内容
  router.post('/commentlist',(req,res)=>{
    console.log(req.body)
    Comment.find({title:req.body.title}).then(data=>{
      return res.send(data)
    }).catch(err=>{
      console.log(err)
    })
  }) 
   // 用户看到自己评论的内容
   router.post('/CommentL',(req,res)=>{
    console.log(req.body)
    Comment.find({username:req.cookies.username}).then(data=>{
      return res.send(data)
    }).catch(err=>{
      console.log(err)
    })
  }) 
  //删除文章
router.post('/deleteArt',function (req,res) {
  Push.remove({_id:req.body._id}).then(result=>{
    return res.status(200).json({message:'删除成功',code:1})
  }).catch(err=>{
    console.log(err)
  })
});
// 发表文章
router.post("/push", function(req, res) {
  // console.log(req.body)
  let newPush = new Push(req.body);
  newPush.save().then(data=>{
    return res.json({
      status:0,
      message:"发表成功"
    })
  }).catch(err=>{
    return res.json({
      status:1,
      message:err
    })
  })
});


//删除评论
router.post('/Comments',function (req,res) {
  Comment.remove({_id:req.body.params._id}).then(result=>{
    return res.status(200).json({message:'删除成功',code:1})
  }).catch(err=>{
    console.log(err)
  })
});
module.exports = router;
