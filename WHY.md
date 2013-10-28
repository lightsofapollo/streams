Streams can be more then just a means of getting at data from the
platform:

<Example>

Streams (like Promises) give us the means to interoperate between
abstractions built in both content and the platform.

Node demonstrates the benefits of this already giving that platform
incredible power when transmitting information via some transport.

I think to the extent possible we should learn from this implementation
while fixing (what I think) is some inconsistent behavior.

  - 1. Readable and Writable streams should be of one and only one
    type. (We could coerce data for convience or throw?

  - 2. The 'readable' event seems flawed in the fact that there can be
    multiple listeners for 'readable' events but calling .read will
    empty the buffer (meaning listeners have to be aware of other
    listeners or only a single is used in pratice anyway).
