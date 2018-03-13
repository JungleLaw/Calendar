const mysql = require('../component/database/Mysql');
const sqls = require('../component/database/sql/user');
const util = require('util');

const User = require('../entity/User');

class SignController {

    static async checkUsernameExist(username) {
        try {
            let result = await mysql.excute(util.format(sqls.checkusernameexist, username));
            return result.length;
        } catch (err) {
            return false;
        }
    }

    //注册
    static async signUp(username, password) {
        let html;
        try {
            let result = await mysql.excute(util.format(sqls.insert, username, password));
            if (result.insertId) {
                html = "register suc";
            } else {
                html = "register fial";
            }
        } catch (err) {
            html = "register fial";
        }
        return html;
    }

    //登陆
    static async signIn(username, password, platform) {
        try {
            let result = await mysql.excute(util.format(sqls.query, username, password));
            if (result.length) {
                let user = new User(result[0].id, result[0].username);
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.log("err = ", err.toString());
            return null;
        }
    }

    //注销
    static async signOut() {
        let result = await mysql.excute();
    }
}

sqls.define();

module.exports = SignController;