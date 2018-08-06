'use strict';

/* eslint-env jasmine */
const ValueDetector = require('../src/ValueDetector');

describe('ValueDetector', () => {
  describe('isValue()', () => {
    it('works with alternative masks', () => {
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

    it('works with built-in masks', () => {
      const o = new ValueDetector();
      const chunks = ['123', 'ABCDE', 'ABCDEFABCDE', 'abca12d231', 'ZZZZABCDEFABCDE'];
      expect(o.isValue(chunks, 0)).toBe(true);
      expect(o.isValue(chunks, 1)).toBe(false);
      expect(o.isValue(chunks, 2)).toBe(true);
      expect(o.isValue(chunks, 3)).toBe(true);
      expect(o.isValue(chunks, 4)).toBe(false);
    });

    it('works with JWT', () => {
      const o = new ValueDetector();
      const chunks = [
        'eyJhbGciOiJIUzI-NiIsInR5cCI6__pXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf5=BADD',
        'eyJhbGciOiJIUzI-NiIsInR5cCI6__pXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U',
        'some.bad.jwt',
      ];
      expect(o.isValue(chunks, 0)).toBe(false);
      expect(o.isValue(chunks, 1)).toBe(true);
      expect(o.isValue(chunks, 2)).toBe(false);
    });

    it('length limits work', () => {
      const o = new ValueDetector({
        minHexLength: 5,
        minBase64Length: 12,
      });
      const chunks = [
        'abcd', // short hex
        'abcde', // ok
        'Z2345678901', // short base64
        'Z23456789012' // ok
      ];
      expect(o.isValue(chunks, 0)).toBe(false);
      expect(o.isValue(chunks, 1)).toBe(true);
      expect(o.isValue(chunks, 2)).toBe(false);
      expect(o.isValue(chunks, 3)).toBe(true);
    });
  });
});
