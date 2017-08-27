module.exports = function (pool) {
    return {
        list: function (callback) {
            pool.query('SELECT * FROM rubrics', callback);
        },

        one: function (slug, callback) {
            pool.query(
                'SELECT * FROM rubrics WHERE ?',
                {slug: slug},
                function (err, result) {
                    callback(err, result[0])
                }
            );
        }
    };
};
