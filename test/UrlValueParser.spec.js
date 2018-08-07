'use strict';

/* eslint-env jasmine */
const UrlValueParser = require('../src/UrlValueParser');

describe('UrlValueParser', () => {
  it('getPathChunks() works', () => {
    const o = new UrlValueParser();
    const chunks = o.getPathChunks('/in/world/14/userId/abca12d231');
    expect(chunks.length).toBe(5);
  });
  it('parsePathValues() works', () => {
    const o = new UrlValueParser();
    const parsed = o.parsePathValues('/in/world/14/userId/abca12d231');
    expect(parsed.valueIndexes.length).toBe(2);
  });

  describe('replacePathValues()', () => {
    it('works with default replacement', () => {
      const o = new UrlValueParser();
      const replaced = o.replacePathValues('/in/world/14/userId/abca12d231');
      expect(replaced).toBe('/in/world/#val/userId/#val');
    });

    it('works with a replacement as a callback', () => {
      const o = new UrlValueParser();
      const replaced = o.replacePathValues(
        '/in/world/abcde/abcdefabcdef/z',
        (chunks, i) => chunks[i] + '-suffix'
      );
      expect(replaced).toBe('/in/world/abcde/abcdefabcdef-suffix/z');
    });

    it('works with a JWT', () => {
      const o = new UrlValueParser();
      const replaced = o.replacePathValues(
        '/auth/token/'
          + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
          + 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.'
          + 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      );
      expect(replaced).toBe('/auth/token/#val');
    });

    it('works with extraMasks and custom hex length', () => {
      const o = new UrlValueParser({
        minHexLength: 4,
        extraMasks: [
          '^z_.*$'
        ]
      });
      const replaced = o.replacePathValues(
        '/customer/AB12/ab/z_something/_z_else/7'
      );
      expect(replaced).toBe('/customer/#val/ab/#val/_z_else/#val');
    });
  });
});
