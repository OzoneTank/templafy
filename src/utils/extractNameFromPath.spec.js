const expect = require('chai').expect;
const extractNameFromPath = require('./extractNameFromPath');

describe('extractNameFromPath', function() {
  it('should grab path and name', function() {
    const path = 'foo/bar/baz.js';
    const expectedPath = 'foo/bar';
    const expectedName = 'baz.js';
    const result = extractNameFromPath(path);
    expect(result.path).to.eq(expectedPath);
    expect(result.name).to.eq(expectedName);
  });

  it('should grab name with no path', function () {
    const path = 'baz.js';
    const expectedPath = '';
    const expectedName = 'baz.js';
    const result = extractNameFromPath(path);
    expect(result.path).to.eq(expectedPath);
    expect(result.name).to.eq(expectedName);
  });
});
