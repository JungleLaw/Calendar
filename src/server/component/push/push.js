const constants = require('../../constants');
const JPush = require("jpush-sdk");

let client = JPush.buildClient(constants.JPush.AppKey, constants.JPush.MasterSecret);

class Push {

    static push() {
        return new Promise((resolve, reject) => {
            client.push().setPlatform(JPush.ALL)
                .setAudience(JPush.ALL)
                .setNotification('Hi, JPush, push a msg!', JPush.ios('ios alert', 'happy', 5))
                .send(function (err, res) {
                    if (err) {
                        console.log(err.message);
                        reject('send fail!');
                    } else {
                        console.log('Sendno: ' + res.sendno);
                        console.log('Msg_id: ' + res.msg_id);
                        resolve('send suc!');
                    }
                });
        });
    }
}

module.exports = Push;