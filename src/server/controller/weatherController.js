const request = require('request');
const util = require('util');


let ApiV6 = require('../constants').HeWeather.Api.v6;
let URL = ApiV6.host + ApiV6.weather +
    "location=%s" + "&" +
    "key=d63dd55456ef483ea21ef17dd01639ff" + "&" +
    "lang=cn" + "&" +
    "unit=m";

function getWeather(city) {
    return new Promise((resolve, reject) => {
        let url = util.format(URL, city);
        request.get(url, function (error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode === 200) {
                resolve(body);
            }
        });
    });
}

class WeatherController {
    static async requestWeather(city) {
        console.log(city);
        let data = await getWeather(city);
        console.log(data);
        return data;
    }
}

module.exports = WeatherController;