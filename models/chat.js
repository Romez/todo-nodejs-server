module.exports = function (pool) {
    return {
        /** Последние записи для вновь зашедшего пользователя */
        getHistory: function (callback) {
            pool.query('SELECT c.mgs, u.username FROM chat c LEFT JOIN users u ON(c.user = u.id) ORDER BY created_at LIMIT 10', callback);
        }
    };
};
