const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src'));

app.get('/', (req,res) =>{
    res.send('Hello World');
})
app.get('/test', (req,res) =>{
    res.set({
        'Content-Type': 'text/plain',
        'Content-Length': '123',
        'ETag': '12345'
      })
    res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
    res.redirect('http://google.com');
    // res.status(404).send('返回404');
})

app.get('/img',(req,res)=>{
    res.sendFile(path.join(__dirname,'./src/images/t1.jpg'));
});
app.get('/download',(req,res)=>{
    console.log(decodeURI(req.url));
    res.download('./src/images/t1.jpg');
})
// 一个简单的 logger
app.use(function(req, res, next){
    res.clearCookie('name', { path: '/test' });
    console.log('%s %s', req.method, req.url);
    next();
  });
  
  // 响应
  app.use(function(req, res, next){
    res.send('Hello World111');
  });


app.listen(9080,()=>{
    console.log('服务器启动，监听端口：9080');
});