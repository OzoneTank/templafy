const expect = require('chai').expect;
const mock = require('mock-require');
const mockData = require('./test/mockData');

describe('printHelp', function() {
  let printHelp;
  const helpText = './constants/help.txt';
  const writeToConsole = './utils/writeToConsole';

  beforeEach(function() {
    mock(helpText, './constants/help.test.txt');
    mock(writeToConsole, mockData.setup(writeToConsole));

    printHelp = require('./printHelp');

    printHelp();
  });

  it('will load and print help text', function () {
    expect(mockData.called(writeToConsole)).to.be.true;
    expect(mockData.get(writeToConsole).first[0]).to.eq('help\ntest\n'.cyan);
  });

  afterEach(function () {
    mockData.reset();
    mock.stopAll();
  });
});
