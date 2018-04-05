var mysql = require('../node_modules/mysql');

class DatabaseManager {
  constructor() {
    this.tableName = 'pictures';
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'database!password',
      database: 'dbo',
    });
    this.connection.connect();
  }

  dispose() {
    this.connection.end();
  }

  insertPicture(newPicture) {
    /*var newPicture = {
      path: 'C:',
      name: 'Test 2',
      date_taken: new Date(),
    };*/
    this.connection.query(`INSERT INTO ${this.tableName} SET ?`, newPicture,
      function (error, rows) {
      if (error) {
        var err = 'Error on INSERT: ' + error;
        console.error(err);
        throw err;
      }
    });
  }

  getPictureById(id) {
    try{
        var rows = await this.connection.query(`SELECT path FROM pictures WHERE id = ${id}`);
        return rows;
    } catch (err){
      throw err;
    }    
      /*function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        return rows;
      });*/
  }

  getAllPictures() {
    this.connection.query('SELECT * FROM pictures', function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      return rows;
    });
  }
}

module.exports = DatabaseManager;
