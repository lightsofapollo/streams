streams
=======

The intent is to figure out the general areas in FXOS where we would benefit form streams and attempt to design something
that solves those needs. From this a formalized (webidl) can be created.

Existing APIs which need streams [based on my knowledge and use cases].

  - [XMLHttpRequest with our responseType = 'moz-chunked-*'](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType)
  - [TCPSocket](http://www.w3.org/TR/raw-sockets/
  
Existing use cases bult in content (not the platform):

  - Streaming XML
  - Streaming ICAL?
  - IMAP
  - ActiveSync WBXML

Potential new use cases

  - Passing a "Stream" with the structred clone algorithm
  - Object Streams
