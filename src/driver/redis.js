const config = require('../../config/config');
const redis = require('redis');
const redisClient = redis.createClient({
    host: config.redis.server.host,
    port: config.redis.server.port,
    db: config.redis.server.database,
});

exports.getValue = async (key) => {
    return new Promise((resolve, reject) => {
        if (config.redis.enable === false) {
            resolve(null);
            return;
        }
        redisClient.get(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                if (reply === null) {
                    resolve(null);
                } else {
                    resolve(JSON.parse(reply));
                }
            }
        });
    });
};

exports.setValue = async (key, value, ttl = 0) => {
    return new Promise((resolve, reject) => {
        if (config.redis.enable === false) {
            resolve(value);
            return;
        }
        const json = JSON.stringify(value);
        redisClient.set(key, json, 'EX', ttl, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
};

exports.delValue = async (key) => {
    return new Promise((resolve, reject) => {
        if (config.redis.enable === false) {
            resolve(null);
            return;
        }
        redisClient.delete(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                if (reply === null) {
                    resolve(null);
                } else {
                    resolve(JSON.parse(reply));
                }
            }
        });
    });
};
