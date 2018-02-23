#!/usr/bin/env node
const setCommands = require('./src/setCommands');
const printHelp = require('./src/printHelp');
const generateCode = require('./src/generateCode');

const args = process.argv;
const commands = setCommands(process.argv);
const {
  badCommands,
  help
} = commands;

if (help) {
  printHelp();
  return;
}

if (badCommands.length) {
  badCommands.forEach((command) => {
    console.log(`bad option: ${command}`);
  });
  return;
}

generateCode(commands);
