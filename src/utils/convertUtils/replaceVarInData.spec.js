const expect = require('chai').expect;
const replaceVarInData = require('./replaceVarInData');

describe('replaceVarInData', function() {
  let varName;
  let data;
  let value;

  beforeEach(function () {
    data = 'aaa\nbbb\nccc';
    value = 'foo\nbar';
    varName = '/*{foo}*/';
  });

  it('should replace value at var', function() {
    data = 'aaa\n/*{foo}*/bbb\nccc';
    const expectedData = 'aaa\nfoo\nbarbbb\nccc';
    const resultData = replaceVarInData({ data, value, varName });
    expect(resultData).to.eq(expectedData);
  });

  it('should replace value at multiple vars', function () {
    data = 'aaa\n/*{foo}*/bbb/*{foo}*/\nccc';
    const expectedData = 'aaa\nfoo\nbarbbbfoo\nbar\nccc';
    const resultData = replaceVarInData({ data, value, varName });
    expect(resultData).to.eq(expectedData);
  });

  it('should ignore var not being used', function () {
    data = 'aaa\n/*{bar}*/bbb\nccc';
    const expectedData = 'aaa\n/*{bar}*/bbb\nccc';
    const resultData = replaceVarInData({ data, value, varName });
    expect(resultData).to.eq(expectedData);
  });

  it('should replace var with other var value', function () {
    data = 'aaa\n/*{foo}*/bbb\nccc';
    value = '/*{bar}*/';
    const expectedData = 'aaa\n/*{bar}*/bbb\nccc';
    const resultData = replaceVarInData({ data, value, varName });
    expect(resultData).to.eq(expectedData);
  });

  it('should return nothing when old value empty', function () {
    const resultData = replaceVarInData({ data: '', value, varName });
    const expectedData = '';
    expect(resultData).to.eq(expectedData);
  });

  it('should return old value when value empty', function () {
    const resultData = replaceVarInData({ data, value: '', varName });
    const expectedData = 'aaa\nbbb\nccc';
    expect(resultData).to.eq(expectedData);
  });
});
