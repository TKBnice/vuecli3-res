
module.exports={
    httpGet(http,url) {
      return new Promise (function(resolve,reject) {
          http.get(url,function(res){  //通过get方法获取对应地址中的页面信息
              var chunks = [];
              var size = 0;
              res.on('data',function(chunk){   //监听事件 传输
                  chunks.push(chunk);
                  size += chunk.length;
              });
              res.on('end',function(){  //数据传输完
                  resolve(Buffer.concat(chunks,size).toString())
              });
          }).on('error', function(err){
              reject(err)
          });
      })

  }
}
