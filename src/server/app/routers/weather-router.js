const router = require('koa-router');
const controller = require('../../controller/weatherController');

let weather = new router();

weather.post('/weather', async (ctx, next) => {
    console.log('weather');
    let city = ctx.request.body.city;
    let token = ctx.request.body.token;
    let platform = ctx.request.body.platform;
    ctx.state.html = await controller.requestWeather(city, token, platform);
    await next();
});

module.exports = weather;