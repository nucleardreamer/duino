var arduino = require('../'),
    board, sensor;

board = new arduino.Board();

sensor = new arduino.Sensor({
  board: board,
  pin: 'A0'
});

sensor.on('read', function(err, value) {
  if(err){console.log(err)}
  value = +value;
  console.log(value);
});