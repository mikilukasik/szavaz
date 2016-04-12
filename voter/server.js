var express = require('express');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var fs = require('fs');

var http = require('http')
var cors = require('cors')


var dbFuncs = require('./modules/dbFuncs.js')
dbFuncs.connect('mongodb://localhost:17890/voterdb')
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



eval(fs.readFileSync('./modules/routes.js') + '');



initRouter(router,app);


var server = httpServ.listen(3000, function() {
	var host = server.address()
		.address;
	var port = server.address()
		.port;
	console.log('app listening at http://%s:%s', host, port);
});
