var FIXTURE = 'fixture.txt';
var fs = require('fs');

// cleanup original fixture
if (fs.existsSync(FIXTURE)) fs.unlinkSync(FIXTURE);

var stream = fs.createWriteStream(FIXTURE);

function jsonWireProtocolFixture(fixture) {
  var json = JSON.stringify(fixture);
  var byteLength = Buffer.byteLength(json);

  var buffer =  new Buffer(byteLength + ':' + json);
  return buffer;
}

function main(input) {
  var i = 1000000;
  write();
  function write() {
    var ok = true;
    do {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
      ok = stream.write(input);
    } while (--i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      stream.once('drain', write);
    }
  }
}

main(jsonWireProtocolFixture({ wow: 'delimited json' }));
