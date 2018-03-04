const expect = require('chai').expect;
const mock = require('mock-require');
const mockData = require('../../test/mockData');

describe('convertPath', function() {
  let convertPath;
  let isTemplate;
  const internalPath = 'test/index/internal/';
  const getInternalPath = '../getInternalPath';


  beforeEach(function() {
    mock(getInternalPath, mockData.setup(getInternalPath, () => internalPath));
    convertPath = require('./convertPath');
  });

  afterEach(function () {
    mockData.reset();
    mock.stopAll();
  });

  it('should get internal path on initialize', function() {
    expect(mockData.called(getInternalPath)).to.be.true;
  });

  describe('on template', function() {
    beforeEach(function() {
      isTemplate = true;
    });

    it('should return a normal path', function () {
      const path = 'some/path';
      const expectedPath = 'some/path';
      const resultPath = convertPath({ path, isTemplate });
      expect(resultPath).to.eq(expectedPath);
    });

    it('should return an internal path', function () {
      const path = ':some/path';
      const expectedPath = 'test/index/internal/templates/some/path';
      const resultPath = convertPath({ path, isTemplate });
      expect(resultPath).to.eq(expectedPath);
    });
  });

  describe('on structure', function () {
    beforeEach(function () {
      isTemplate = false;
    });

    it('should return a normal path', function () {
      const path = 'some/path';
      const expectedPath = 'some/path';
      const resultPath = convertPath({ path, isTemplate });
      expect(resultPath).to.eq(expectedPath);
    });

    it('should return an internal path', function () {
      const path = ':some/path';
      const expectedPath = 'test/index/internal/structures/some/path';
      const resultPath = convertPath({ path, isTemplate });
      expect(resultPath).to.eq(expectedPath);
    });
  });

});
