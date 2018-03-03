const expect = require('chai').expect;
const mock = require('mock-require');
const mockData = require('./test/mockData');

describe('runFromCommandLine', function() {
  let runFromCommandLine;
  const setOptions = './setOptions';
  const printHelp = './printHelp';
  const generateCode = './generateCode';
  const writeToConsole = './utils/writeToConsole';
  let options = {};
  let args = [];

  beforeEach(function () {
    mock(setOptions, mockData.setup(setOptions, () => {
      return options;
    }));
    mock(printHelp, mockData.setup(printHelp));
    mock(generateCode, mockData.setup(generateCode));
    mock(writeToConsole, mockData.setup(writeToConsole));

    options = {
      badOptions: [],
      help: false,
    };
    args = ['node', './index', '--foo=bar'];
    runFromCommandLine = require('./runFromCommandLine');
  });

  afterEach(function () {
    mockData.reset();
    mock.stopAll();
  });

  context('setOptions', function() {
    it('will use args', function () {
      const expectedArgs = ['node', './index', '--foo=bar'];
      runFromCommandLine(args);
      expect(mockData.called(setOptions)).to.be.true;
      expect(mockData.get(setOptions).first[0]).to.include.members(expectedArgs);
      expect(mockData.called(generateCode)).to.be.true;
    });
  });

  context('printHelp', function() {
    it('will not print if option false', function () {
      runFromCommandLine(args);
      expect(mockData.called(printHelp)).to.be.false;
      expect(mockData.called(generateCode)).to.be.true;
    });

    it('will print if option true', function () {
      options.help = true;
      runFromCommandLine(args);
      expect(mockData.called(printHelp)).to.be.true;
      expect(mockData.called(generateCode)).to.be.false;
    });
  });

  context('bad options', function() {
    it('will not write if no bad options', function () {
      runFromCommandLine(args);
      expect(mockData.called(writeToConsole)).to.be.false;
      expect(mockData.called(generateCode)).to.be.true;
    });

    it('will write if bad options exist', function () {
      options.badOptions = [
        'foo',
        'bar'
      ];

      runFromCommandLine(args);
      expect(mockData.called(writeToConsole, 2)).to.be.true;
      expect(mockData.get(writeToConsole).first[0]).to.eq('bad option: foo');
      expect(mockData.get(writeToConsole).second[0]).to.eq('bad option: bar');

      expect(mockData.called(generateCode)).to.be.false;
    });
  });

  context('generate code', function() {
    it('will call with options', function() {
      const expectedOptions = {
        badOptions: [],
        help: false
      }
      runFromCommandLine(args);
      expect(mockData.called(generateCode)).to.be.true;
      expect(mockData.get(generateCode).first[0]).to.deep.eq(expectedOptions);
    });
  });
});
