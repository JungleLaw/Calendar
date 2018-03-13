const mysql = require('mysql');
const config = require('../../config.local');

let pool = null;

function initialize() {
    if (!pool) {
        pool = mysql.createPool(config.dev.database);
    }
}

class Mysql {
    static excute(sql) {
        console.log(sql);
        if (!pool) {
            initialize();
        }
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
                }
            });
            // pool.query(sql, (err, rows) => {
            //     if (err) {
            //         reject(err)
            //     } else {
            //         resolve(rows)
            //     }
            // });
        });
    }
}

module.exports = Mysql;