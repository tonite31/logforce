const socketRedis = require('socket.io-redis');
const LogforceWebRoute = require('../src/routes/logforce.web.route.js');
const LogforceStreamRoute = require('../src/routes/logforce.stream.route.js');

module.exports = function(server)
{
    const io = require('socket.io')(server);

    if(process.env.SOCKET_REDIS)
    {
        io.adapter(socketRedis({ host: process.env.SOCKET_REDIS, port: 6379 }));
    }

    let logforceStream = io.of('/logforce-stream');
    let logforceWeb = io.of('/logforce-web');

    logforceStream.on('connection', function(socket)
    {
        LogforceStreamRoute(socket, logforceWeb);

        console.log('logstream ', socket.id, ' connected');

        socket.on('disconnect', function()
        {
            console.log('Disconnect: ' + socket.id);
        });
    });

    logforceWeb.on('connection', function(socket)
    {
        LogforceWebRoute(socket);

        console.log('logforce-web ', socket.id, ' connected');

        socket.on('disconnect', function()
        {
            console.log('Disconnect: ' + socket.id);
        });
    });
};