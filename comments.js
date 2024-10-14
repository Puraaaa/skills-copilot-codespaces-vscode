// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Read comments from file
var comments = [];
fs.readFile('./comments.json', function(err, data) {
    if (err) {
        console.error(err);
    } else {
        comments = JSON.parse(data);
    }
});

var server = http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (req.method === 'GET') {
        if (url_parts.pathname === '/comments') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(comments));
        }
    } else if (req.method === 'POST') {
        if (url_parts.pathname === '/comments') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var newComment = qs.parse(body);
                comments.push(newComment);
                fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(newComment));
            });
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found\n');
    }
});

server.listen(3000, function() {
    console.log('Server started');
});