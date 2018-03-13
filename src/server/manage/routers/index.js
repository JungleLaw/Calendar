const Router = require('koa-router');
const page = require('./page-router');

let routers = new Router();

routers.use(page.routes(), page.allowedMethods());

module.exports = routers;