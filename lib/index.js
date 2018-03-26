#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');

fs.readdirSync(__dirname).filter((file) => {
  return file !== 'index.js';
}).forEach((file) => {
  require(path.join(__dirname, file)).call(this, program, fs, path);
});

program.parse(process.argv);
