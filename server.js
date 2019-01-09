const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const helmet = require('helmet');

const app = global._app = express();
const server = app.listen(process.env.PORT || 8718, function()
{
    console.log();
    console.log(chalk.green('Listening on port', server.address().port));
    console.log();

    const fs = require('fs');
    if(!fs.existsSync('./temp'))
    {
        fs.mkdirSync('./temp');
    }
});

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.set('trust proxy', 1);

app.use(session({
    secret: 'creeta',
    name: 'sessionId',
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 60 * 60 * 2 * 1000), maxAge: 60 * 60 * 2 * 1000 }
}));

app.use(helmet());
app.disable('x-powered-by');

app.use('/', express.static('public'));

process.on('uncaughtException', function (err)
{
    console.error(err);
});

module.exports.error = function(err, req, res, next)
{
    console.error(err);
};

require('./config/socket.io.js')(server);