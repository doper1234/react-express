var express = require('express');
var router = express.Router();
var DatabaseManager = require('../database_operations/databaseManager.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var databaseManager = new DatabaseManager();
  var file =  databaseManager.getPictureById(4);
  console.log(`Sending file: ${file}`);
  res.sendFile(file);
  /*res.json([
    { id: 1, username: 'json' },
    { id: 2, username: 'atom' },
  ]);*/
});

module.exports = router;
