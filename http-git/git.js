

//引入http 模块
let http =  require('http');

//引入url模块

let url = require('url');

//引入 querystring模版
let querystring = require('querystring');

//创建http服务
http.createServer((request,response) => {
    //url.parse方法 是解析一个url地址并且返回一个url对象
    let parseurl = url.parse(request.url);
    //接收的返回值中点出query可以拿到url问号后面的字符串
    // console.log(parseurl);

    //quertString.parse 该方法会把一个url查询字符串str解析成一个键值对集合;
    let result = querystring.parse(parseurl.query);
    console.log(result);
    
    response.end('lalalal')
}).listen(80,'127.0.0.1',()=> {
    console.log('开启监听 127.0.0.1')
})
