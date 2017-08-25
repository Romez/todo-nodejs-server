module.exports = function (pool) {
    return {
        list: function (callback) {
            pool.query('SELECT * FROM tasks', callback);
        },

        add: function (task, callback) {
            pool.query('INSERT INTO tasks SET ?', {task: task}, callback);
        },

        change: function (id, text, callback) {
            // TODO
        },

        complete: function (id, callback) {
            //TODO
        },

        delete: function (id, callback) {
            pool.query('DELETE FROM tasks WHERE ?', {id: id}, callback);
        },

        view: function (id, callback) {
            pool.query(
                'SELECT * FROM tasks WHERE ?',
                {id: id},
                function (err, result) {
                    callback(err, result[0])
                }
            );
        }
    };
};
