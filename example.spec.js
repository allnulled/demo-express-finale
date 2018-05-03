var userId = 0;
var example = require("./example.js");
example.promise.then(function() {
	var request = require("request");
	var async = require("async");
	var {
		it,
		its,
		report
	} = require("assertivity").generate();
	async.series([
		function(done) {
			console.log();
			console.log("1) First GET");
			request.get({
				url: "http://localhost:8008/users"
			}, function(error, response, body) {
				// @TODO: assertions
				var resp = JSON.parse(response.body);
				// console.log(response.body);
				var data = JSON.parse(response.body);
				report.as("Users returned").that.it(data).is.array();
				report.as("No users found").that.it.is.empty();
				done();
			});
		},
		function(done) {
			console.log();
			console.log("2) First POST");
			request.post({
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				url: "http://localhost:8008/users",
				body: "name=usuario 1&birthday=1991-1-5 10:20"
			}, function(error, response, body) {
				// @TODO: assertions
				var data = JSON.parse(response.body);
				console.log(data);
				report.as("First user created").that.it(data).is.object();
				report.as("First user with correct name").that.it(data.name).is("usuario 1");
				report.as("First user with correct birthday").that.it(data.birthday).is("1991-01-05T09:20:00.000Z");
				userId = data.id;
				done();
			});
		},
		function(done) {
			console.log();
			console.log("3) First PUT");
			request.put({
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				url: "http://localhost:8008/users/" + userId,
				body: "name=usuario 1 modificado&birthday=1991-1-1 11:20"
			}, function(error, response, body) {
				// @TODO: assertions
				// console.log("Updated user with id %s", JSON.parse(response.body).id);
				var data = JSON.parse(response.body);
				console.log(data);
				report.as("First user modified").that.it(data).is.object();
				report.as("First user with correct new name").that.it(data.name).is("usuario 1 modificado");
				report.as("First user with correct birthday").that.it(data.birthday).is("1991-01-01T10:20:00.000Z");
				userId = data.id;
				done();
			});
		},
		function(done) {
			console.log();
			console.log("4) Second GET");
			request.get({
				url: "http://localhost:8008/users"
			}, function(error, response, body) {
				// @TODO: assertions
				// console.log("Users:", JSON.stringify(JSON.parse(response.body), null, 4));
				var data = JSON.parse(response.body);
				console.log(data);
				report.as("First user modified").that.it(data).is.array();
				report.as("First user with correct new name").that.it(data[0].name).is("usuario 1 modificado");
				report.as("First user with correct birthday").that.it(data[0].birthday).is("1991-01-01T10:20:00.000Z");
				done();
			});
		},
		function(done) {
			console.log();
			console.log("5) First DELETE");
			request.delete({
				url: "http://localhost:8008/users/" + userId
			}, function(error, response, body) {
				// @TODO: assertions
				// console.log("Deleted user ", JSON.stringify(JSON.parse(response.body), null, 4));
				var data = JSON.parse(response.body);
				console.log(data);
				report.as("First user deleted").that.it(data).is.object();
				report.as("Delete returned an empty array").that.it(data).is.empty();
				done();
			});
		},
		function(done) {
			console.log();
			console.log("6) Third GET");
			request.get({
				url: "http://localhost:8008/users"
			}, function(error, response, body) {
				// @TODO: assertions
				// console.log("Get current users: %s", JSON.stringify(JSON.parse(response.body), null, 4));
				var data = JSON.parse(response.body);
				console.log(data);
				report.as("User was deleted").that.it(data).is.array();
				report.as("Users is now empty").that.it(data).is.empty();
				done();
			});
		},
		function(done) {
			example.server.close();
			console.log("Server was closed");
			process.exit(0);
			done();
		}
	]);
});