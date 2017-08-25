var config = require('./config');

var restify = require('restify');
var rest = restify.createServer({
    name: 'TodoList'
});

rest.listen(9088, function() {
    console.log('API launched');
});

rest.use(restify.plugins.authorizationParser());
rest.use(restify.plugins.queryParser());
rest.use(restify.plugins.bodyParser());
rest.use(restify.plugins.gzipResponse());


/* vvv ALWAYS ACCEPTS CORS!!! vvv */
rest.use(function(req, res, next) {
    if (req.headers.origin)
        res.header('Access-Control-Allow-Origin', req.headers.origin);

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id, x-access-token');
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');

    return next();
});

rest.opts('.*', function(req, res, next) {
    if (req.headers.origin && req.headers['access-control-request-method']) {
        // res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id, x-access-token');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
        res.send(204);
    } else {
        res.send(404);
    }

    return next();
});

var mysql = require('mysql');
var pool = mysql.createPool(config.db);

var tasks = require('./models/tasks')(pool);
var tasksController = require('./controllers/tasksController')(tasks);

rest.get('/tasks', tasksController.findAll);
rest.post('/', tasksController.findAll);

