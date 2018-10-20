const express = require('express');
const app = express();
var cors = require('cors');

var querystring = require('querystring');

app.use(cors());
app.use(function(req,res,next){
    var str ='';
    req.on('data',(chunk)=>{
        str += chunk;
    })
    req.on('end',()=>{
        req.body = str;
        next();
    })
})

var arr = [
    {id:10,name:'宝马',ctime:new Date()},
    {id:11,name:'奔驰',ctime:new Date()},
    {id:12,name:'路虎',ctime:new Date()},
    {id:13,name:'玛莎拉蒂',ctime:new Date()},
    {id:14,name:'拉博季尼',ctime:new Date()},
    {id:15,name:'比亚迪',ctime:new Date()},
]

app.get('/api/getprodlist',(req,res)=>{
    res.send({status:0,message:arr})
})

app.post('/api/addproduct',(req,res)=>{
    // arr.push(JSON.parse(req.body))
    var index = arr[arr.length-1].id+1;
    var item = JSON.parse(req.body);
    item.id = index;
    item.ctime = new Date();
    arr.push(item)
    console.log(arr);
    res.send({status:200,msg:'ok'})
})

app.get('/api/delproduct/:id',(req,res)=>{
    var rid = Number(req.params.id)
    var index;
    arr.forEach(function(item,i){
        if(item.id == req.params.id){
            index = i;
        }
    })
    arr.splice(index,1)//位置，个数
    res.send({status:0,msg:'ok'})
})


app.listen(80,'127.0.0.1')