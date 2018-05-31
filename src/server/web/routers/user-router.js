const router = require('koa-router');
const signController = require('../../controller/signController');

let user = new router();

user.get('/sign', async (ctx, next) => {
    let title = 'Sign';
    await ctx.render('sign', {
        title,
    });
});

user.post('/signup', async (ctx, next) => {
    console.log('signup');
    console.log(ctx.request.body);
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let platform = "web";
    let exist = await signController.checkUsernameExist(username);
    if (!exist) {
        ctx.state.html = await signController.signUp(username, password, platform);
    } else {
        ctx.state.html = "exist";
    }
    // await ctx.render('Index', {
    //     title,
    // });
    await next();
});
user.post('/signin', async (ctx, next) => {
    console.log('signin');
    console.log(ctx.request.body);
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let data = await signController.signIn(username, password, "web");
    if (data) {
        ctx.state.html = JSON.stringify(data);
    } else {
        ctx.state.html = "登陆失败";
    }
    await next();
});
user.post('/signout', async (ctx, next) => {
    console.log('signout');
    ctx.state.html = await signController.signOut();
    await next();
});
user.post('/logout', async (ctx, next) => {
    console.log('logout');
    console.log(ctx.request.body);
    let id = ctx.request.body.id;
    let data = await signController.logOut(id);
    if (data) {
        ctx.state.html = "注销成功";
    } else {
        ctx.state.html = "注销失败";
    }
    await next();
});
module.exports = user;