const LZUTF8 = require('lzutf8');

module.exports = function(socket, logforceWeb)
{
    socket.on('log', function(data)
    {
        let origin = Buffer.from(data.log, 'hex');
        let decompressed = LZUTF8.decompress(origin);

        console.log(JSON.parse(decompressed));

        logforceWeb.emit('log', JSON.parse(decompressed));
    });
};