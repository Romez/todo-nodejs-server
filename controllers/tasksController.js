module.exports = function (tasks) {
    var findAll = function(req, res) {
        tasks.list(function (err, tasks) {
            if(err){
                res.send(500, {error: err});
            } else {
                res.send(200, {tasks: tasks});
            }
        })
    };

    return {
        findAll: findAll
    };
};