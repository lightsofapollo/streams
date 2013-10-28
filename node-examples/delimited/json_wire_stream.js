var util = require('util');
var ReadableStream = require('stream').Transform;
var fs = require('fs');

var SEPARATOR = ':';
var SEPARATOR_CODE = SEPARATOR.charCodeAt(0);

function JSONWireStream(source) {
  ReadableStream.call(this, { objectMode: true });

  source.on('end', function() {
    this.push(null);
  }.bind(this));

  // trigger internal _read when source is ready
  source.on('readable', function() {
    this._read(0);
  }.bind(this));

  this._source = source;
  this._nextLength = null;
  this._lengthBuffer = null;
}

util.inherits(JSONWireStream, ReadableStream);

function readForLength(wire) {
  var current;
  while ((current = wire._source.read(1))) {
    // if current === ':' we have enough bytes to read the content.
    if (current[0] === SEPARATOR_CODE) {
      wire._nextLength = parseInt(wire._lengthBuffer.toString(), 10);
      // clear existing length buffer
      wire._lengthBuffer = null;
      wire._read();
      break;
    }

    // add to the length buffer
    if (!wire._lengthBuffer) {
      wire._lengthBuffer = current;
      return;
    }

    wire._lengthBuffer = Buffer.concat([wire._lengthBuffer, current]);
  }
}

function readForContent(wire) {
  var current = wire._source.read(wire._nextLength);

  if (!current) return;

  if (current.length !== wire._nextLength) {
    return wire._source.unshift(current);
  }

  var json = JSON.parse(current.toString());

  // unset next length
  wire._nextLength = null;
  wire._read();
  wire.push(json);
}

JSONWireStream.prototype._read = function() {
  if (!this._nextLength) {
    return readForLength(this);
  }
  readForContent(this);
};

module.exports = JSONWireStream;
