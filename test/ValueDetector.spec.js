'use strict';

/* eslint-env jasmine */
const ValueDetector = require('../src/ValueDetector');

describe('ValueDetector', () => {
  describe('isValue()', () => {
    it('works with alternative masks', () => {
      const o = new ValueDetector({
        valueMasks: [
          /^abc$/,
          '^xyz$'
        ]
      });
      expect(o.isValue('123')).toBe(false);
      expect(o.isValue('abc')).toBe(true);
      expect(o.isValue('xyz')).toBe(true);
      expect(o.isValue('wxyz')).toBe(false);
    });

    it('works with built-in masks', () => {
      const o = new ValueDetector();
      expect(o.isValue('123')).toBe(true);
      expect(o.isValue('ABCDE')).toBe(false);
      expect(o.isValue('ABCDEFABCDE')).toBe(true);
      expect(o.isValue('abca12d231')).toBe(true);
      expect(o.isValue('ZZZZABCDEFABCDE')).toBe(false);
    });

    it('works with JWT', () => {
      const o = new ValueDetector();
      const chunks = [
        'eyJhbGciOiJIUzI-NiIsInR5cCI6__pXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf5=BADD',
        'eyJhbGciOiJIUzI-NiIsInR5cCI6__pXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U',
        'some.bad.jwt',
      ];
      expect(o.isValue(chunks[0])).toBe(false);
      expect(o.isValue(chunks[1])).toBe(true);
      expect(o.isValue(chunks[2])).toBe(false);
    });

    it('length limits work', () => {
      const o = new ValueDetector({
        minHexLength: 5,
        minBase64Length: 12,
      });
      expect(o.isValue('abcd')).toBe(false); // short hex
      expect(o.isValue('abcde')).toBe(true);
      expect(o.isValue('Z2345678901')).toBe(false); // short base64
      expect(o.isValue('Z23456789012')).toBe(true);
    });
  });
});
