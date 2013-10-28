var fs = require('fs');
var JSONWireStream = require('./json_wire_stream.js');
var input = fs.createReadStream('fixture.txt');
var jsonStream = new JSONWireStream(input);

//jsonStream.once('readable', function(obj) {
  //console.log('xx');
  //console.log(jsonStream.read(), '<<<!');
  //jsonStream.read();
//});

var items = 0;

jsonStream.on('data', function(obj) {
  items++;
});

jsonStream.once('end', function() {
  console.log(items);
});
