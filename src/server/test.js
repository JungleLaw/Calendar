/*
const Mysql = require('./database/Mysql');

async function query() {
    let data = await Mysql.excute('select * from users');
    console.log(data);
    return data;
}

query();*/

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/demo";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});*/
/*

console.log("test start");

const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('./config.local');
const routers = require('./routers.test');

const app = new Koa();

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(config.dev.database)
}));

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
console.log(path.join(__dirname, ''));
app.use(convert(koaStatic(
    path.join(__dirname, '')
)));

// 配置服务端模板渲染引擎中间件
console.log(path.join(__dirname, ''));
app.use(views(path.join(__dirname, ''), {
    extension: 'ejs'
}));


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.use((ctx) => {
    console.log('render');
    ctx.response.body = ctx.state.html;
});

// 监听启动端口
app.listen(4400);
console.log(`the server is start at port 4400`);
// app.listen(config.dev.app.port);
// console.log(`the server is start at port ${config.dev.app.port}`);
*/

const crypto = require('crypto');

console.log(new Date().getTime());

md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('Hex').toUpperCase();
};

console.log(md5("wujiandao"));