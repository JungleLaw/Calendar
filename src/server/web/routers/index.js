const Router = require('koa-router');
const page = require('./page-router');
const sign = require('./user-router');

let routers = new Router();

routers.use(page.routes(), page.allowedMethods());
routers.use(sign.routes(), sign.allowedMethods());

module.exports = routers;