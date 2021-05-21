var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2] || "8888";

var server = http.createServer(function(request, response) {
	var parsedUrl = url.parse(request.url, true);
	var pathWithQuery = request.url; 
	var queryString = "";
	if (pathWithQuery.indexOf("?") >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf("?")); }
	var path = parsedUrl.pathname;
	var query = parsedUrl.query;
	var method = request.method;

	/******** 从这里开始看，上面不要看 ************/

	console.log("有发送请求，路径（带查询参数）为：" + pathWithQuery);
	response.statusCode = 200;
	path = (path === "/") ? "/index.html" : path;
	let setHead = /(?<=\.)(\w*$)/.exec(path)[0];

	let hashMap = {
		html:"text/html",
		css:"text/css",
		js:"text/javascript",
		png:"image/png",
		jpg:"image/jpg"
	};
	response.setHeader("Content-Type", `${hashMap[setHead] || "text/html"};charset=utf-8`);
	let string;
    
	try {
		string = fs.readFileSync(`public${path}`);
	
	} catch (error) {
		string = "路径不正确";
		response.statusCode = 404;
	}

	//const page1 = fs.readFileSync("db/page1.json").toString();
	//const array = JSON.parse(page1);
	//const result = array.map(item => `<li>${item.id}</li>`).join("");
	//string = string.replace("{{page1}}", `<ul id="xxx">${result}</ul>`);
	response.write(string);
	response.end();
	
	/******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n打开 http://localhost:" + port);
