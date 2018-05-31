const mysql = require('../component/database/Mysql');
const sqls = require('../component/database/sql/user');
const util = require('util');

const User = require('../entity/User');
const Token = require('../entity/Token');

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
    static async signUp(username, password, platform) {
        let html;
        try {
            let result = await mysql.excute(util.format(sqls.insert, username, password, platform));
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
            let token = await Token.generate(result[0].id, platform);

            if (result.length && token) {
                let user = new User();
                user.id = result[0].id;
                user.username = result[0].username;
                user.token = token;
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.log("err = ", err.toString());
            return null;
        }
    }

    //登出
    static async signOut() {
        let result = await mysql.excute();
    }

    //注销
    static async logOut(id) {
        let result = await mysql.excute(util.format(sqls.logout, id));
        return result.changedRows;
    }
}

sqls.define();

module.exports = SignController;