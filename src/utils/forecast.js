const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cd3723ce880190dfcb60064a00dd3750&query=${lat},${lon}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(err, undefined)
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast;