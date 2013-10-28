function WebStream() {
}

WebStream.prototype = {
  // data management
  push: function() {},
  unshift: function() {},
  read: function() {},

  open: function() {}
};


var stream = new WebStream();

stream.setReader(function() {
  var bytes = stream.read(10);
});

StreamReader
