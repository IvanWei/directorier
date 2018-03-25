const program = require('commander');
const {version} = require('../package.json');
const currentVersion = `Current version: ${version}`;

module.exports = (program) => {
  program
    .version(currentVersion, '-v, --version')
};
