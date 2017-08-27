module.exports = function (pool) {
    return {
        findOne: function (username, callback) {
            pool.query('SELECT * FROM users WHERE ?', {username:username}, function (err, user) {
                callback(err, user[0]);
            });
        },
        findAll: function (callback) {
            pool.query('SELECT * FROM users', callback);
        }
    };
};
