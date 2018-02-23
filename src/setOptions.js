const startAtIndex = 2; // will be 1 eventually I think

const setOptions = (args) => {
  const options = {
    args: [],
    badOptions: [],
    forceTemplate: false,
    help: false,
    interactive: false,
    overwrite: false,
    templateVars: {},
    varLeft: '/*{',
    varRight: '}*/',
    verbose: false
  };

  if (args.length <= startAtIndex) {
    options.help = true;
  }

  args.forEach(function (arg, i) {
    if (i < startAtIndex) {
      return;
    }
    const split = arg.split('=')
    const option = split[0];
    const value = split.slice(1).join('=');

    switch (option) {
      case '-o':
      case '--overwrite':
        options.overwrite = true;
        return;
      case '-h':
      case '--help':
        options.help = true;
        return;
      case '-p':
      case '-print':
        options.verbose = true;
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
        options.templateVars = JSON.parse(value);
        return;
      default:
        if (option.indexOf('-') === 0) {
          options.badOptions.push(option);
          return;
        }
        options.args.push(option);
        return;
    }
  });

  return options;
};

module.exports = setOptions;
