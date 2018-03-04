const expect = require('chai').expect;
const addDataAtLine = require('./addDataAtLine');

describe('addDataAtLine', function() {
  let oldData;
  let data;
  let line;

  beforeEach(function() {
    oldData = 'aaa\nbbb\nccc';
    data = 'foo\nbar';
  });

  context('adds to beginning', function() {

    it('when line is 1', function () {
      line = 1;
      const resultData = addDataAtLine({oldData, data, line});
      const expectedData = 'foo\nbar\naaa\nbbb\nccc';
      expect(resultData).to.eq(expectedData);
    });

    it('when line is below 1', function () {
      line = -10;
      const resultData = addDataAtLine({ oldData, data, line });
      const expectedData = 'foo\nbar\naaa\nbbb\nccc';
      expect(resultData).to.eq(expectedData);
    });
  });

  it('should add data to some line', function () {
    line = 3;
    const resultData = addDataAtLine({ oldData, data, line });
    const expectedData = 'aaa\nbbb\nfoo\nbar\nccc';
    expect(resultData).to.eq(expectedData);
  });

  context('adds at end', function() {
    it('when line is length', function () {
      line = 4;
      const resultData = addDataAtLine({ oldData, data, line });
      const expectedData = 'aaa\nbbb\nccc\nfoo\nbar';
      expect(resultData).to.eq(expectedData);
    });

    it('when line is larger than length', function () {
      line = 100;
      const resultData = addDataAtLine({ oldData, data, line });
      const expectedData = 'aaa\nbbb\nccc\nfoo\nbar';
      expect(resultData).to.eq(expectedData);
    });
  });

  it('should return data when old data empty', function() {
    line = 2;
    const resultData = addDataAtLine({ oldData: '', data, line });
    const expectedData = 'foo\nbar';
    expect(resultData).to.eq(expectedData);
  });

  it('should return old data when data empty', function () {
    line = 2;
    const resultData = addDataAtLine({ oldData, data: '', line });
    const expectedData = 'aaa\nbbb\nccc';
    expect(resultData).to.eq(expectedData);
  });
});
