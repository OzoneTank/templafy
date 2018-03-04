const expect = require('chai').expect;
const mock = require('mock-require');
const mockData = require('../../test/mockData');

describe('interactiveFileName', function() {
  let interactiveFileName;
  const readlineSync = 'readline-sync';
  const extractNameFromPath = '../extractNameFromPath';
  let resultName;
  let resultPath;
  let resultNewName;
  let path;

  beforeEach(function() {
    mock(readlineSync, {
      question: mockData.setup(readlineSync, () => {
        return resultNewName;
      })
    });
    mock(extractNameFromPath, mockData.setup(extractNameFromPath, () => {
      return {
        name: resultName,
        path: resultPath
      };
    }));

    resultName = 'name.js';
    resultNewName = 'name2.js';
    resultPath = 'path';
    path = 'path/name.js'
    interactiveFileName = require('./interactiveFileName');
  });

  afterEach(function () {
    mockData.reset();
    mock.stopAll();
  });

  it('should get expected path', function() {
    const result = interactiveFileName(path);
    const expectedQuestion = 'path/(name.js): ';
    expect(result).to.eq('path/name2.js');
    expect(mockData.called(extractNameFromPath)).to.be.true;
    expect(mockData.get(extractNameFromPath).first[0]).to.eq(path);
    expect(mockData.called(readlineSync)).to.be.true;
    expect(mockData.get(readlineSync).first[0]).to.eq(expectedQuestion);
  })
});
