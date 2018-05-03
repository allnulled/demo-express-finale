var express = require("express");
var Sequelize = require("sequelize");
var finale = require("finale-rest");
var bodyParser = require("body-parser");
var http = require("http");
var app = express();
var database = new Sequelize("restexample", "root", "toor", {
	dialect: "mysql",
	operatorsAliases: false,
	logging: false
});
var User = database.define("User", {
	name: Sequelize.STRING,
	birthday: Sequelize.DATE
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

finale.initialize({
	app: app,
	sequelize: database
});

var userResource = finale.resource({
	model: User,
	endpoints: ["/users", "/users/:id"]
});

var server = http.createServer(app);
var promise = new Promise(function(resolve, reject) {
	database.sync({
		force: true
	}).then(function() {
		server.listen(8008, function() {
			var host = server.address().address;
			var port = server.address().port;
			console.log("Listening at http://%s:%s", host, port);
			resolve(server);
		});
	});
});

module.exports = {promise, server};