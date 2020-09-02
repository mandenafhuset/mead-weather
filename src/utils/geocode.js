const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJpc3Rhbmx1ZWdlciIsImEiOiJja2RxeHVqM2wwa25uMnFteTh1d3BvOHVsIn0.fSEXo9zxMLM1tIPVs-SA7A&limit=1';

    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to location servies, bitch!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const {features} = body;
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
};

module.exports = geocode;