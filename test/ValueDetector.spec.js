'use strict';

/* eslint-env jasmine */
const ValueDetector = require('../src/ValueDetector');

describe('ValueDetector', () => {
  it('isValue() works with alternative masks', () => {
    const o = new ValueDetector({
      valueMasks: [
        /^abc$/,
        'xyz'
      ]
    });
    const chunks = ['123', 'abc', 'xyz', 'wxyz'];
    expect(o.isValue(chunks, 0)).toBe(false);
    expect(o.isValue(chunks, 1)).toBe(true);
    expect(o.isValue(chunks, 2)).toBe(true);
    expect(o.isValue(chunks, 3)).toBe(false);
  });
});
