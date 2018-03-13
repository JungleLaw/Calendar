const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('../config.local');
const routers = require('./routers');
const setting = require('../component/setting/setting');

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
app.use(convert(koaStatic(
    path.join(__dirname, './static')
)));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './static/html'), {
    extension: 'ejs'
}));

app.use(setting.preset);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.use((ctx) => {
    console.log('render');
    ctx.response.body = ctx.state.html;
});

// 监听启动端口
app.listen(config.dev.manage.port);
console.log(`the server is start at port ${config.dev.manage.port}`);