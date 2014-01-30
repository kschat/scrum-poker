var http = require('http'),
	fs = require('fs'),
	connect = require('connect'),
	connectRoute = require('connect-route'),
	gzippo = require('gzippo');

var app = connect()
	.use(connect.logger('dev'))
	.use(gzippo.staticGzip(__dirname + '/public'))
	.use(gzippo.staticGzip(__dirname + '/views'));

app.use(connectRoute(function(router) {
	
	router.get('/', function(req, res, next) {
		res.end(fs.readFileSync(__dirname + '/views/home.html'));
	});

	router.get('/home', function(req, res, next) {
		res.end(fs.readFileSync(__dirname + '/views/home.html'));
	});
}));

var port = process.env.PORT || 3000;

app.listen(port);