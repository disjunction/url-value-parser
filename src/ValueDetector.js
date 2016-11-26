'use strict';

class ValueDetector {
  constructor(opts) {
    this.valueMasks = opts.valueMasks || [
      /^\d+$/,
      /^[\da-f]{8}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{12}$/i, // UUID
      /^[\da-f]{7,}$/, // hex code with at least 7 chars and consistent case
      /^[\dA-F]{7,}$/
    ];
  }

  matchToAMask(chunks, index, mask) {
    if (typeof mask === 'string') {
      return chunks[index] === mask;
    } else {
      return chunks[index].match(mask);
    }
  }

  isValue(chunks, index) {
    for (let mask of this.valueMasks) {
      if (this.matchToAMask(chunks, index, mask)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = ValueDetector;
