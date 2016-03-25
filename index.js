#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const updateNotifier = require('update-notifier');

const pkg = require('./package.json');

require('./rules/000-check-node-vesion').run();
require('./rules/001-check-npm-vesion').run();

// check if a new version of ncu is available and print an update notification
updateNotifier({pkg,updateCheckInterval:1}).notify();

program
  .version(pkg.version)
  // .usage('[options] folder...')

program
  .command('init <folder>')
  .option('-q, --quiet', 'quiet')
  .description('initialize target directory as angular2 module')
  .action((folder, options)=> {
    require('./rules/002-check-folder').run({folder});
  });


program.parse(process.argv);

// show help information by default
if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}
