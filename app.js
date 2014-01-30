var	fs = require('fs'),
	connect = require('connect'),
	connectRoute = require('connect-route');

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.compress())
	.use(connect.static(__dirname + '/public', { maxAge: 31536000 }))
	.use(connect.static(__dirname + '/views', { maxAge: 31536000 }));

app.use(connectRoute(function(router) {
	router.get('/', function(req, res, next) {
		res.end(fs.readFileSync(__dirname + '/views/home.html'));
	});
}));

var port = process.env.PORT || 3000;

app.listen(port);