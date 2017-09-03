module.exports = function (users, md5, jwt, config) {

    var findAll = function(req, res) {
        users.findAll(function (err, users) {
            res.send(200, {users: users});
        });
    };

    var auth = function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        users.findOne(username, function (err, user) {
            if(err) {
                res.send(500, {error: err});
            } else if (user && user.password === md5(password+user.salt)) {
                var token = jwt.sign(user, config.auth.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                res.send(200, {token: token, username: user.username});

            } else {
                return res.send(401);
            }
        });
    };

    var checkAuth = function (req, res, next) {
        var token = (req.body && req.body.token) || (req.query.token) || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.auth.secret, function(err, user) {
                if (err) {
                    return res.send(401, { success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.user = user;
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.send(403, {
                success: false,
                message: 'No token provided.'
            });
        }
    };

    return {
        checkAuth: checkAuth,
        auth: auth,
        findAll: findAll
    };
};