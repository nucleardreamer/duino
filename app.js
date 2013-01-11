
var io = require('socket.io');
var express = require('express');
var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	request = require('request'),
	arduino = require('./'),
    board, sensor, ping;
 
board = new arduino.Board({debug: false});

sensor = new arduino.Sensor({
	board: board,
	pin: 'A0'
});

ping = new arduino.Ping({
	board: board,
	pin: '7'
});

var photosensor = {
	data: 0
}

var rangesensor = {
	data: 0
}

server.listen(8080);

app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/index.html');
  
});

io.sockets.on('connection', function (socket) {

	socket.emit('init', { init: 'true' });
	
	setInterval(function(){
		socket.emit('sensor',{
			photo: photosensor,
			range: rangesensor
		});
	},100)
	
});
ping.on('read', function(err, value, data) {
	console.dir(arguments);
	rangesensor.data = value;
});
sensor.on('read', function(err, value) {
	value = +value;
	//console.log(value);
	photosensor.data = value;
});