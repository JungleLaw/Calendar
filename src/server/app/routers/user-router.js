const router = require('koa-router');
const signController = require('../../controller/signController');

let user = new router();

user.post('/signup', async (ctx, next) => {
    console.log('signup');
    console.log(ctx.request.body);
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let exist = await signController.checkUsernameExist(username);
    if (!exist) {
        ctx.state.html = await signController.signUp(username, password);
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
    let data = await signController.signIn(username, password, "app");
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

module.exports = user;