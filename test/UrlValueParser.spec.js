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
  });
});
