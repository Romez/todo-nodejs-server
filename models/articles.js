module.exports = function (pool) {
    return {
        list: function (callback) {
            pool.query('SELECT * FROM articles', callback);
        },

        one: function (id, callback) {
            pool.query(
                'SELECT * FROM articles WHERE ?',
                {id: id},
                function (err, result) {
                    callback(err, result[0])
                }
            );
        },

        findBy: function (slug, callback) {
            pool.query(
                'SELECT * FROM articles a LEFT JOIN rubrics r ON( a.rubric_id = r.id )WHERE ?',
                {slug: slug}, callback
            );
        },

        add: function (data, callback) {
            pool.query(
                'INSERT INTO articles(title, body, rubric_id, created_at)' + 'VALUES (?, ?, ?, ?)',
                [data.title, data.body, data.rubric,  data.created_at],
                callback
            );
        },
    };
};
