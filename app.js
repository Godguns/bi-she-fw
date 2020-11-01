var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')
var isOnline=require('./models/isOnline')
// 3 创建服务器应用程序
//      也就是原来的http.createServer();
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
// function onConnection(socket){
//   //console.log("连接")
//   socket.on('online', (data) => {
//     console.log(socket.id,"这个人上线了")
//     //socket.emit('msg', "are u online?");
//   })
// }
var people;
io.on('connection',  function(socket){
  
  socket.on('sender',async function(data){
    
    

   await isOnline.findOne({username:data.to},async (err,ret)=>{
      if(err){
        console.log("转发失败，查无此人")
      }else{
        var obj={
          data:data,
          avater:data.avater,
          ret:ret
        }
       
      await  socket.emit(data.to,obj)
      console.log(data.to+"接受消息："+obj)
      }
    })
})
  //socket.broadcast.emit('isconnect', "欢迎上线");
  socket.emit('isconnect', "欢迎上线");
  socket.broadcast.emit('welcome', "欢迎上线");
  socket.emit('welcome',"欢迎上线")

    socket.on('online', async (data) => {

    console.log(data.socket_id,"这个人上线了")
   // console.log("++++++  "+data.username+"    ++++++++")
     await isOnline.findOne({
        username:data.username,
       
        
      },async(err,ret)=>{
        if(err){
        //  console.log("查询在线状态失败！")
        }else{
         // console.log(ret===null)
          if(ret===null){
              var onlineuser=new isOnline({
                username:data.username,
                avater:data.avater,
                socket_id:data.socket_id
              });
           await   onlineuser.save({},(err,ret)=>{
                if(err){
                  console.log(err)
                }else{
                  isOnline.find({},(err,ret)=>{
                    if(err){}else{
                      var people=new Set();
                      for(var i=0; i<ret.length;i++){
                        people.add(ret[i].username)
                      }
                      console.log(people)
                      socket.broadcast.emit("datalist",[...people])
                      socket.emit('datalist',[...people])
                    }
                  })
                }
              })
          }else{
           await isOnline.updateOne({
              username:data.username,
              
            },{username:data.username,avater:data.avater,socket_id:data.socket_id})
            await isOnline.findOne({
              username:data.username
            },(err,ret)=>{
              if(err){
                console.log("查找失败")
              }else{
                isOnline.find({},(err,ret)=>{
                  if(err){}else{
                   people=new Set();
                    for(var i=0; i<ret.length;i++){
                      people.add(ret[i].username)
                    }
                    console.log(people)
                    socket.broadcast.emit("datalist",[...people])
                    socket.emit('datalist',[...people])
                  }
                })
              }
            })
           
          }
       
         
       
        }

       
      })
     
   

//????
  
});

// setInterval(()=>{
//   socket.broadcast.emit("datalist",[...people])
//   socket.emit('datalist',[...people])
// },5000)
  socket.on('exit',function(data){
    isOnline.deleteOne({username:data.username},async(err,ret)=>{
      if(err){
        console.log("删除出错")
      }else{
        //console.log("删除成功")
       
     await  isOnline.find({},async (err,ret)=>{
       if(err){
         console.log("???")
       }else{
        await socket.broadcast.emit('out',ret)
       }
     })
       
        
      }
    })
  })
 

  
});





app.all('*', function(req, res, next) {
  if( req.headers.origin == 'http://localhost:8080' || req.headers.origin == 'http://localhost:8081' ){
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'POST, GET');
      res.header("Access-Control-Allow-Credentials", "true"); 
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      //res.header('Access-Control-Allow-Headers', 'Content-Type',token);
      res.header('Access-Control-Allow-Headers', 'request-origin,Content-Type,token, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  }
  next();
});




// app.use((req,res,next)=>{
//    res.header("Access-Control-Allow-Credentials", "true"); 
//  res.header('Access-Control-Allow-Origin', '*');
// res.header("Access-Control-Allow-Headers", "Content-Type,token");//这里“Access-Token”是我要传到后台的内容key
// res.header('Content-Type', 'application/json;charset=utf-8')
// 　　//res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
// 　　res.header('Access-Control-Allow-Headers', 'request-origin,Content-Type,token, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
// 　　res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
// 　　if (req.method == 'OPTIONS') {
// 　　　　res.sendStatus(200) /*让options请求快速返回*/
// 　　} else {
// 　　　　next();
// 　　}
// })
//模板引擎在Express中开放模板也是一个API的事

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))
//监听客户端链接,回调函数会传递本次链接的socket


// 监听连接断开事件
// socket.on("disconnect", () => {
//   console.log("连接已断开...");
// });

// 把路由挂载到 app 中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
  //res.render('404.html')
})

// 相当于server.listen
http.listen(4001,function(){
    console.log('服务在4001端口已经启动');
})
