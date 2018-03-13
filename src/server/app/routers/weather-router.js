const router = require('koa-router');
const controller = require('../../controller/weatherController');

let weather = new router();

weather.post('/weather', async (ctx, next) => {
    console.log('weather');
    let city = ctx.request.body.city;
    ctx.state.html = await controller.requestWeather(city);
    await next();
});

module.exports = weather;