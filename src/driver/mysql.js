const mysql = require('mysql');
const stringHash = require('string-hash');
const config = require('../../config/config');

const cluster = mysql.createPoolCluster();
cluster.add('common', config.database.common);

Object.values(config.database.user.list).map((info, shard) => {
    cluster.add(shard.toString(), info);
});

exports.closePool = () => {
    cluster.end();
};

exports.getAllShardNo = () => {
    return Object.keys(config.database.user.list);
};

exports.getNewShardNo = (userId) => {
    const userIdHash = stringHash(userId);
    const shardKey = (userIdHash % config.database.user.shardTarget.length);
    const shardNo = config.database.user.shardTarget[shardKey];
    console.log(`userId: ${userId}, shardKey: ${shardKey}, shardNo: ${shardNo}`);
    return shardNo;
};

exports.getConnection = async (shard) => {
    return new Promise((resolve, reject) => {
        cluster.getConnection(shard.toString(), (err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

exports.select = async (connection, sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

            connection.release();
        });
    });
};

exports.selectOne = async (connection, sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    resolve(null);
                } else {
                    resolve(result[0]);
                }
            }

            connection.release();
        });
    });
};

exports.selectMap = async (connection, sql, params, key) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    resolve({});
                } else {
                    const _result = {};
                    result.map((value) => {
                        const _key = value[key];
                        _result[_key] = value;
                    });
                    resolve(_result);
                }
            }

            connection.release();
        });
    });
};

exports.executeQuery = async (connection, sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }

            connection.release();
        });
    });
};
