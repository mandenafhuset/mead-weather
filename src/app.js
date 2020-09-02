const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebar shit
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir
app.use(express.static(publicDirPath));

const name = 'Buster bozo problem head';
const year = '2020';

app.get('', (req, res) => {
    res.render('index', {
        name,
        year,
        title: 'Handlebars, brah',
        haze: 'No haze no bueno',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        name,
        year,
        title: 'this is the about section, brah',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name,
        year,
        message: 'Do you need some help brah?',
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Poopy cack'
        })
    }

    geocode(req.query.address, (err, { latitude: lat, longitude: lon} = {}) => {
        if (err) {
            return console.log(err)
        };

        forecast(lat, lon, (err, {location, current}) => {
            if (err) {
                return console.log(err)
            };

            res.send({
                forecast: `${current.weather_descriptions} with a temperature of ${current.temperature}C.`,
                location: `${location.name}, ${location.region}`,
                humidity: `${current.humidity}`,
                address: req.query.address
                
            });
        })

    })
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name,
        year,
        message: 'You still don\'t get it, do you, you fat idiot'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name,
        year,
        message: 'Idiot boomer is a fat idiot'
    })
})

app.listen(port, () => {
    console.log(`port ${port} is on`);
}) 