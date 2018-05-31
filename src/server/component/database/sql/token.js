const mysql = require('../Mysql');

module.exports = {
    create: `CREATE TABLE IF NOT EXISTS tokens (
  id       INT  AUTO_INCREMENT PRIMARY KEY          NOT NULL UNIQUE,
  userid   INT,
  token    VARCHAR(100)                             NOT NULL UNIQUE,
  validate BOOL DEFAULT TRUE,
  platform VARCHAR(10),
  time     DATETIME                                 NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userid) REFERENCES users(id)
);`,
    insert: 'INSERT INTO tokens (tokens.userid, tokens.token, tokens.platform) VALUES (\'%s\',\'%s\',\'%s\');',
    query: 'SELECT * FROM tokens WHERE tokens.token = \'%s\' AND tokens.platform = \'%s\';',
    findUserByToken: 'SELECT u.* FROM users AS u RIGHT JOIN tokens AS t ON u.id = t.userid WHERE t.token = \'%s\' AND t.platform = \'%s\'',
    invalidate: 'UPDATE tokens SET tokens.validate = FALSE WHERE tokens.userid = \'%s\';',
    define() {
        mysql.excute(this.create);
    }
};