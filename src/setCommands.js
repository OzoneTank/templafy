const startAtIndex = 2; // will be 1 eventually I think

const setCommands = (args) => {
  const commands = {
    args: [],
    badCommands: [],
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
    commands.help = true;
  }

  args.forEach(function (arg, i) {
    if (i < startAtIndex) {
      return;
    }
    const split = arg.split('=')
    const command = split[0];
    const value = split.slice(1).join('=');

    switch (command) {
      case '-o':
      case '--overwrite':
        commands.overwrite = true;
        return;
      case '-h':
      case '--help':
        commands.help = true;
        return;
      case '-p':
      case '-print':
        commands.verbose = true;
        return;
      case '-t':
      case '-template':
        commands.forceTemplate = true;
        return;
      case '-i':
      case '--interactive':
        commands.interactive = true;
        return;
      case '--vars':
        commands.templateVars = JSON.parse(value);
        return;
      default:
        if (command.indexOf('-') === 0) {
          commands.badCommands.push(command);
          return;
        }
        commands.args.push(command);
        return;
    }
  });

  return commands;
};

module.exports = setCommands;
