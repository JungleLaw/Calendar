const mysql = require('../Mysql');

module.exports = {
    create: `CREATE TABLE IF NOT EXISTS users (
  id       INT     AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE,
  username VARCHAR(20) UNIQUE                 NOT NULL,
  password VARCHAR(50)                        NOT NULL,
  gender   ENUM ('F', 'M'),
  age      INT CHECK (users.age > 0),
  sign     VARCHAR(50),
  address  VARCHAR(50),
  mobile   VARCHAR(20),
  token    VARCHAR(100),
  validate BOOL DEFAULT TRUE,
  platform VARCHAR(10),
  registration_time DATETIME NOT NULL DEFAULT NOW()
);`,
    insert: 'INSERT INTO users (users.username,users.password,users.platform) VALUES (\'%s\',\'%s\',\'%s\');',
    query: 'SELECT * FROM users WHERE users.username = \'%s\' AND users.password = \'%s\' AND users.validate = 1',
    logout: 'UPDATE users SET users.validate = 0 WHERE users.id = \'%d\';',
    active: 'UPDATE users SET users.validate = 1 WHERE users.id = \'%d\';',
    checkusernameexist: 'SELECT * FROM users WHERE users.username = \'%s\'',
    define() {
        mysql.excute(this.create);
        require('../../database/sql/token').define();
    }
};