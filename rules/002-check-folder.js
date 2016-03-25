'use strict';

/* eslint no-sync:0 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const shelljs = require('shelljs');
const inquirer = require('inquirer');

module.exports.run = options => {
  const folderPath = options.folder;

  shelljs.echo(chalk.white('Checking does folder "%s" exists'), chalk.green(folderPath));
  // if not exists -> question: create?
  if (!folderExists(folderPath)) {
    const questions = [{
      type: 'confirm',
      name: 'createFolder',
      message: chalk.green('Should we create a new folder?'),
      'default': false
    }];

    inquirer.prompt(questions, answer => {
      if (answer.createFolder) {
        // should we support recursive folders creation ?
        shelljs.mkdir('-p', folderPath);
      }
      shelljs.exit(0);
    });
  }
};

function folderExists(folderPath) {
  try {
    return !fs.accessSync(path.resolve(shelljs.pwd(), folderPath), fs.W_OK);
  } catch (err) {
    return false;
  }
}
