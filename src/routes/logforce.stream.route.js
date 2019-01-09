const LZUTF8 = require('lzutf8');

module.exports = function(socket, logforceWeb)
{
    socket.on('log', function(data)
    {
        let origin = Buffer.from(data.log, 'hex');
        let decompressed = LZUTF8.decompress(origin);

        logforceWeb.emit('log', JSON.parse(decompressed));
    });
};