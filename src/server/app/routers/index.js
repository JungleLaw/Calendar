const Router = require('koa-router');
const page = require('./page-router');
const weather = require('./weather-router');
const user = require('./user-router');

let routers = new Router();

routers.use(page.routes(), page.allowedMethods());
routers.use(weather.routes(), weather.allowedMethods());
routers.use(user.routes(), user.allowedMethods());

module.exports = routers;