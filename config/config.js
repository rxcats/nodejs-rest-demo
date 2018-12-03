module.exports = Object.freeze({
    port: 8080,
    database: {
        common: {
            host: '192.168.99.100',
            user: 'root',
            password: 'root',
            port: 3306,
            database: "commondb",
            connectionLimit: 20,
            waitForConnections: false
        },
        user: {
            shardTarget: [0],
            list: {
                0: {
                    host: '192.168.99.100',
                    user: 'root',
                    password: 'root',
                    port: 3306,
                    database: "userdb0",
                    connectionLimit: 20,
                    waitForConnections: false
                }
            }
        }
    },
    redis: {
        enable: false,
        server: {
            host: '192.168.99.100',
            port: 6379,
            database: 0,
            max_clients: 30,
            perform_checks: false
        }
    }
});