const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.encoding = options.encoding;
    this.dataSize = 0;
  }

  _transform(chunk, encoding, callback) {
    this.dataSize += Buffer.byteLength(chunk, this.encoding);
    if (this.dataSize > this.limit) {
      callback(new LimitExceededError(), null);
    } else {
      callback(null, chunk.toString(this.encoding));
    }
  }
}

module.exports = LimitSizeStream;
