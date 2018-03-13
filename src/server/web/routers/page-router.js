const router = require('koa-router');

let page = new router();

page.get('/404', async (ctx, next) => {
    console.log('404 get');
    ctx.state.html = '404 page!';
    await next();
});
page.get('/page', async (ctx, next) => {
    console.log('web page get');
    ctx.state.html = 'Hello world, web page! ';
    await next();
});
page.get('/', async (ctx, next) => {
    let title = 'Index';
    await ctx.render('index', {
        title,
    });
});

module.exports = page;