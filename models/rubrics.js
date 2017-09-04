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

        oneBy: function (data, id, callback) {
            pool.query(
                'SELECT * FROM rubrics WHERE ? AND id != ?',
                [data, id],
                function (err, result) {
                    callback(err, result[0])
                }
            );
        },

        getRubricArticles: function (slug, callback) {
            pool.query(
                'SELECT * FROM articles_list WHERE ?',
                {slug: slug}, callback
            );
        },

        add: function (data, callback) {
            pool.query(
                'INSERT INTO rubrics(name, slug)' + 'VALUES (?, ?)',
                [data.name, data.slug], callback
            );
        },

        deleteOne: function (slug, callback) {
            pool.query(
                'DELETE FROM rubrics WHERE slug=?',
                [slug], callback
            );
        },

        edit: function (data, callback) {
            pool.query(
                'UPDATE rubrics SET name=?, slug=? WHERE id=?',
                [data.name, data.slug, data.id], callback
            );
        },
    };
};
