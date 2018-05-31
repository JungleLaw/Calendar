const mysql = require('../component/database/Mysql');
const sql = require('../component/database/sql/token');
const util = require('util');
const crypto = require('crypto');

const BET = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';

function retrieveToken() {
    let token = "";
    for (let i = 0; i < 16; i++) {
        token += BET.charAt(Math.random() * (BET.length - 1));
    }
    let millis = new Date().getTime();
    console.log("millis = " + millis);
    token += millis;
    console.log("token = " + token);
    return crypto.createHash('md5').update(token).digest('Hex').toUpperCase();
}

class Token {
    constructor(id, userid, token, validate, platform, time) {
        this.id = id;
        this.userid = userid;
        this.token = token;
        this.validate = validate;
        this.platform = platform;
        this.time = time;
    }

    static async generate(userid, platform) {
        try {
            let tokenDisplay = retrieveToken();
            let result = await mysql.excute(util.format(sql.insert, userid, tokenDisplay, platform));
            if (result.insertId) {
                return tokenDisplay;
            } else {
                return null;
            }
        } catch (err) {
            console.log("err = ", err.toString());
            return null;
        }
        // if (result.affectedRows) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    static async findUserByToken(token, platform) {
        try {
            let result = await mysql.excute(util.format(sql.findUserByToken, token, platform));
            if (result.length) {
                return result;
            } else {
                return null;
            }
        } catch (err) {
            console.log("err = ", err.toString());
            return null;
        }
    }
}

module.exports = Token;
