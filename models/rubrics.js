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
        },

        getRubricArticles: function (slug, callback) {
        pool.query(
            'SELECT ' +
            'a.id as article_id, ' +
            'title, ' +
            'body, ' +
            'created_at ' +
            'FROM articles a ' +
            'LEFT JOIN rubrics r ON( a.rubric_id = r.id ) ' +
            'WHERE ?',
            {slug: slug}, callback
        );
    }
    };
};
