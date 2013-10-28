function AbstractReadableStream() {
}

AbstractReadableStream.prototype = {

  // internal api for pushing content into streams.
  // Ideally we can expose streams to content to extend
  // BUT we also may not want to expose this on streams from the
  // platform.
  push: function(input) {
  },

  unshift: function(input) {
  },

  pipe: function(writableStream) {
  }
};
