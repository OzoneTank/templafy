const expect = require('chai').expect;
const addTabSpace = require('./addTabSpace');

describe('addTabSpace', function() {
  let data;
  let spaces;

  beforeEach(function() {
    data = 'aaa\n bbb\n  ccc';
    spaces = 2;
  });

  it('should add spaces to data', function() {
    const expectedData = '  aaa\n   bbb\n    ccc';
    const resultData = addTabSpace({ data, spaces });
    expect(expectedData).to.eq(resultData);
  });

  context('does not add space to data', function () {
    it('when 0', function () {
      spaces = 0;
      const expectedData = 'aaa\n bbb\n  ccc';
      const resultData = addTabSpace({ data, spaces });
      expect(expectedData).to.eq(resultData);
    });

    it('when undefined', function () {
      spaces = undefined;
      const expectedData = 'aaa\n bbb\n  ccc';
      const resultData = addTabSpace({ data, spaces });
      expect(expectedData).to.eq(resultData);
    });
  });

  it('should not add spaces for blank data', function() {
    data = '';
    const expectedData = '';
    const resultData = addTabSpace({ data, spaces });
    expect(expectedData).to.eq(resultData);
  });
});
