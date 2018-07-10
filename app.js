
//引入http板块
let http = require('http');
//fs文件读取板块
let fs = require('fs');

//path路径板块
let path = require('path');


//引入第三方插件
let mime = require('mime');
//配置根目录路径

let rootPath = path.join(__dirname,'www');
// console.log(rootPath);

//创建http服务

http.createServer((request,response) => {   
    //根据request.url 生成绝对路径
    let filePath = path.join(rootPath,request.url);
    //判断路径是否存在
    let isExist = fs.existsSync(filePath);

    if(isExist) {
        //用异步读取文件夹
        fs.readdir(filePath, (err,files) => {
            //报错代表没有文件夹那么就是文件
            //直接返回文件
            if(err) {
                fs.readFile(filePath,(err,data) =>{
                    response.writeHead(200, {
                        'content-type':mime.getType(filePath)
                    })
                    response.end(data);
                })
            }else {
                // console.log(files);
                //判断是否有首页
                if(files.indexOf('index.html') != -1) {
                    //有的话就拼接路径直接返回首页
                    fs.readFile(path.join(filePath,'index.html'),(err,data) => {
                        response.end(data);
                    })
                }else{
                    //如果没有首页
                    let backData = '';
                    for(var i = 0; i < files.length; i++){
                        backData += `<h2><a href='${request.url == '/' ? '':request.url }/${files[i]}'>${files[i]}</a></h2>`

                    }

                    response.writeHead(200,{
                        'content-type':'text/html;charst=utf-8'
                    })

                    response.end(backData);
                }
            }

        })
        
    }else {
        response.writeHead(404,{
            'content-type':'text/html;charst=utf-8'
        })

        response.end(`
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>The requested URL /index.hththt was not found on this server.</p>
            </body></html>
        `)
    }

}).listen(800,'127.0.0.1',()=> {
    console.log('开启监听 127.0.0.1')
})