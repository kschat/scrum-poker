var http = require('http'),
	fs = require('fs'),
	connect = require('connect'),
	connectRoute = require('connect-route');

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.static(__dirname + '/public'));

app.use(connectRoute(function(router) {
	
	router.get('/', function(req, res, next) {
		res.end(fs.readFileSync(__dirname + '/views/home.html'));
	});

	router.get('/home', function(req, res, next) {
		res.end(fs.readFileSync(__dirname + '/views/home.html'));
	});
}));

app.listen(3000);