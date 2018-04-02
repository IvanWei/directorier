let directoryCount = 1;
let fileCount = 0;

module.exports = (program, fs, path) => {
  program
    .command('output')
    .option('-p, --path', 'Specify directory path')
    .action((directoryPath) => {
      let currentPath = '';
      let rootPath = path.resolve();

      if (typeof directoryPath === 'string') {
        currentPath = directoryPath;
        rootPath = path.resolve(directoryPath)
      }

      console.log(path.basename(rootPath))
      printDirectory(rootPath, currentPath, fs, path);

      console.log('');
      console.log(`Directories: ${directoryCount}, files: ${fileCount}`)
    })
};

function printDirectory(rootPath, currentPath, fs, path) {
  fs.readdirSync(path.resolve(currentPath))
    .filter((file) => {
      const skipDirectoriesAndFiles = ['node_modules', '.git']
      return skipDirectoriesAndFiles.indexOf(file) === -1;
    })
    .sort((previousValue, currentValue) => {
      const pVal = previousValue.toString().toLowerCase();
      const nVal = currentValue.toString().toLowerCase();

      if (pVal < nVal) return -1;
      if (pVal > nVal) return 1;
      return 0;
    })
    .forEach((file, index, array) => {
      let floor = '';
      const absolutePath = path.resolve(currentPath, file);
      const dirCount = absolutePath.replace(rootPath, '').match(/\//g);

      if (fs.lstatSync(absolutePath).isDirectory()) {
        directoryCount++;

        for (let i = 0; i < (dirCount.length - 1) ; i++) floor += '│  ';
        console.log(`${floor}${(index === array.length - 1)?'├':'├'}─ ${file}`);

        printDirectory(rootPath, absolutePath, fs, path);

      } else {
        fileCount++;

        for (let i = 0; i < (dirCount.length - 1) ; i++) floor += '│  ';
        console.log(`${floor}${(index === array.length - 1)?'└':'├'}─ ${file}`);
      }
    })
}
