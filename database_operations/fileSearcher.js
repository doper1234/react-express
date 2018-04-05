class FileSearcher {
  defaultExtensions = ['JPEG', 'PNG', 'JPG'];
  constructor(databaseManager) {
    this.databaseManager = databaseManager;
  }

  getValidFilesInDirectory(startPath, extensions = this.defaultExtensions) {

    if (!fs.existsSync(startPath)) {
      console.log('no dir ', startPath);
      return;
    }

    this.filesWithValidExtensions = [];
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var filePath = path.join(startPath, file);
      var stat = fs.lstatSync(filePath);
      if (stat.isDirectory()) {
        fromDir(filePath, extensions); //recurse
      } else if (hasValidExtension(filePath, extensions)) {
        this.filesWithValidExtensions.push({ path: filePath, name: file });
      };
    };
  };

  hasValidExtension(fileName, extensions) {
    for (var extension of extensions) {
      if (fileName.indexOf(extension) >= 0)
        return true;
    }

    return false;
  }

  insertFilesIntoDatabase() {
    if (this.filesWithValidExtensions) {
      for (file of this.filesWithValidExtensions) {
        insertFileDataIntoDatabase(file.path, file.name);
      }
    }
  }

  insertFileDataIntoDatabase(filePath, fileName) {
    fs.stat(filePath, function (err, stats) {
      if (err) return cb2(err);
      var picture = {
        path: filePath,
        name: fileName,
        date_taken: stats.mtime,
      };
      this.databaseManager.insertPicture(picture);
    });
  }
}

export default FileSearcher;
