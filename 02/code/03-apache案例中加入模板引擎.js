var htpp = require('http');
var fs = require('fs');
var template = require('art-template');
//创建server
var server = htpp.createServer();
var wwwDir = 'I:/app/www'
//一个请求一个响应，如果在一个请求的过程中，已经结束响应了，则不能发送响应

server.on('request', function (req, res) {
    var url = req.url;
    fs.readFile('./apache-template.html', function (err, data) {
        if (err) {
            return console.log(err)
        } else {
            fs.readdir('I:/app/www/', function (err, files) {
                if (err) {
                    res.end('目录不存在')
                } else {
                    //只需使用模板引擎解析替换data中的模板字符串就可以了
                    //数据就是files
                    var html =template.render(data.toString(),{
                            files:files
                    })
                    console.log(html);
                    // files.forEach(function (item) {
                    //     html += '<tr>\n' +
                    //         '        <td data-value="apple/"><a class="icon dir" href="/node/02/code/template.html/apple/">' + item + '</a></td>\n' +
                    //         '        <td class="detailsColumn" data-value="0"></td>\n' +
                    //         '        <td class="detailsColumn" data-value="1544690868">2018/12/13 下午4:47:48</td>\n' +
                    //         '    </tr>'
                    // })

                    res.end(html)
                }
            })

        }
    })


})
server.listen(3000, function () {
    console.log('running')
})