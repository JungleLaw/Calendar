const Router = require('koa-router');
const app = require('./app/routers/index');
const manager = require('./manage/routers/index');
const web = require('./web/routers/index');
const wx = require('./wx/routers/index');

let routers = new Router();

routers.use("/app", app.routes(), app.allowedMethods());
// routers.use(app.routes(), app.allowedMethods());
routers.use("/manage", manager.routes(), manager.allowedMethods());
routers.use("/web", web.routes(), web.allowedMethods());
routers.use("/wx", wx.routes(), wx.allowedMethods());

module.exports = routers;