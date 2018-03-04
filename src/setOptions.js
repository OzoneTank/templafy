const startAtIndex = 2; // will be 1 eventually I think

const setOptions = (args) => {
  const options = {
    args: [],
    badOptions: [],
    forceTemplate: false,
    help: false,
    interactive: false,
    mode: undefined,
    listTemplates: false,
    listStructures: false,
    templateInfo: {},
    leftVar: '/*{',
    rightVar: '}*/',
    verbose: false,
  };

  if (args.length <= startAtIndex) {
    options.help = true;
  }

  args.forEach(function (arg, i) {
    if (i < startAtIndex) {
      return;
    }
    const split = arg.split('=');
    let option = split[0];
    const value = split.slice(1).join('=');

    switch (option) {
      case '-h':
      case '--help':
        options.help = true;
        return;
      case '-m':
      case '--mode':
        options.mode = value;
        return;
      case '-l':
      case '--list':
      case '--list-templates':
        options.listTemplates = true;
        return;
      case '--list-structures':
        options.listStructures = true;
        return;
      case '--leftVar':
        options.leftVar = value;
        return;
      case '-p':
      case '-print':
        options.verbose = true;
        return;
      case '--rightVar':
        options.rightVar = value;
        return;
      case '-t':
      case '-template':
        options.forceTemplate = true;
        return;
      case '-i':
      case '--interactive':
        options.interactive = true;
        return;
      case '--vars':
        options.templateInfo = JSON.parse(value);
        return;
      default:
        if (option.indexOf('-') === 0) {
          options.badOptions.push(option);
          return;
        }
        if (option.endsWith('/')) {
          option = option.slice(0, -1);
        }
        options.args.push(option);
        return;
    }
  });

  return options;
};

module.exports = setOptions;
