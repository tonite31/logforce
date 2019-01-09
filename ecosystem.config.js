module.exports =
{
    apps :
    [
        {
            name: "logforce",
            script: "./server.js",
            env:
            {
                "PORT": 80,
                "NODE_ENV": "dev",
                "SOCKET_REDIS": "creeta-development.7lzvax.0001.apse1.cache.amazonaws.com"
            },
            env_production:
            {
                "PORT": 80,
                "NODE_ENV": "prod",
                "SOCKET_REDIS": "creeta-socket-prod.7lzvax.0001.apse1.cache.amazonaws.com"
            }
        }
    ]
};