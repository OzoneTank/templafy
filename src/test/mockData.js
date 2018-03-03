let mocks = {}

const mockData = {
  get: (name) => {
    let data = {
      first: mocks[name][0],
      second: mocks[name][1],
      third: mocks[name][2],
      fourth: mocks[name][3],
      fifth: mocks[name][4],
      sixth: mocks[name][5],
      seventh: mocks[name][6],
      eighth: mocks[name][7],
      ninth: mocks[name][8],
      tenth: mocks[name][9]
    };
    mocks[name].forEach((element, i) => {
      data[i] = element;
    });

    return data;
  },
  called: (name, num) => {
    const numCalled = mocks[name] ? mocks[name].length : 0;
    if (num === undefined) {
      return numCalled > 0;
    }
    return numCalled === num;
  },
  reset: () => {
    mocks = {};
  },
  setup: (name, cb = () => {}) => {
    mocks[name] = [];
    return (...args) => {
      mocks[name].push([...args]);
      return cb(...args);
    }
  }
};

module.exports = mockData;
