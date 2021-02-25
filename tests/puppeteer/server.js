var http = require('http');
var fs = require('fs');

http
	.createServer(function (req, res) {
		if (req.url === '/') {
			fs.readFile('./index.html', function (_, content) {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(content, 'utf-8');
			});
		} else {
			fs.readFile(`.${req.url || ''}`, function (_, content) {
				res.writeHead(200, { 'Content-Type': 'text/javascript' });
				res.end(content, 'utf-8');
			});
		}
	})
	.listen(8080);
