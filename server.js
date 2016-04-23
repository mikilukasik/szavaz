var express = require('express');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var fs = require('fs');

var _ = require('underscore')

var http = require('http');
var cors = require('cors');

var arrayFind = require('array.prototype.find');

var bcrypt = require('bcrypt');


var mongocn = process.env.DOKKU_MONGO_VOTIDB_PORT_27017_TCP.replace('tcp://','mongodb://miki:miki@') + '/' + "votidb"

console.log('mongo connection string: ',mongocn)

var dbFuncs = require('./modules/dbFuncs.js')

dbFuncs.connect(mongocn)


var app = express()

var httpServ = http.createServer(app)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors())

app.use(express.static('www'))
app.use(morgan("combined"))

var router = express.Router()

var seneca = require('seneca')();

seneca.use('./modules/loginActions.js',{
	dbFuncs: dbFuncs,
	bcrypt: bcrypt
});

seneca.use('./modules/voteActions.js',{
	dbFuncs: dbFuncs,
	_: _
});


seneca.use('./modules/idActions.js',{
	dbFuncs: dbFuncs,
	_: _
});



eval(fs.readFileSync('./modules/routes.js') + '');



initRouter(router,app);


var server = httpServ.listen(5000, function() {
	var host = server.address()
		.address;
	var port = server.address()
		.port;
	console.log('app listening at http://%s:%s', host, port);
});
