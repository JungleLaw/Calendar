const Router = require('koa-router');
const Push = require('../../component/push');

let page = new Router();

page.get('/page', async (ctx, next) => {
    console.log('manage page get');
    ctx.state.html = 'Hello world, manage page! ';
    await next();
});
page.get('/', async (ctx, next) => {
    let title = 'Index';
    await ctx.render('index', {
        title,
    });
});
page.get('/go', async (ctx, next) => {
    ctx.state.html = await Push.push();
    await next();
});
page.get(`/404`, async (ctx, next) => {
    console.log('404 get');
    ctx.state.html = '404 page!';
    await next();
});

module.exports = page;