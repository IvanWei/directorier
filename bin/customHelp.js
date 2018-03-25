module.exports = (program, fs, path) => {
  program.on('--help', function(){
    console.log('');
    console.log('  Examples:');
    console.log('    $ directorier --help');
    console.log('    $ directorier -h');
    console.log('');
  });
};
