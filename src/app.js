const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const compress = require('compression');
const logger = require('morgan-body');
const error = require('./error/error');
const config = require('../config/config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(compress());

logger(app);

app.use('/', require('./routes'));

app.use(error.converter);

const server = app.listen(config.PORT, function () {
    console.log(`server started! port:${config.PORT}`);
});

const shutdown = () => {
    server.close(() => {
        console.log('Http server closed.');
        process.exit(0);
    });
};

// shutdown hook
process.on('SIGINT', () => {
    shutdown();
});