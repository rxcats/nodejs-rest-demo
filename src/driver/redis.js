const config = require('../../config/config');
const redisPool = require('redis-connection-pool')('default', config.redis.server);

exports.getValue = async (key) => {
    return new Promise((resolve, reject) => {
        if (config.redis.enable === false) {
            resolve(null);
            return;
        }
        redisPool.get(key, (err, reply) => {
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
        redisPool.set(key, json, (err) => {
            if (err) {
                reject(err);
            } else {
                if (ttl > 0) {
                    redisPool.expire(key, ttl, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(value);
                        }
                    });
                } else {
                    resolve(value);
                }
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
        redisPool.del(key, (err, reply) => {
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
