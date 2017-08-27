module.exports = function (rubrics) {
    var findAll = function(req, res) {
        rubrics.list(function (err, rubrics) {
            if(err){
                res.send(500, {error: err});
            } else {
                res.send(200, {rubrics});
            }
        })
    };

    var findOne = function(req, res) {
        console.log(  );
        rubrics.one(req.params.slug, function (err, rubric) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {rubric});
            }
        });
    };

    return {findAll, findOne};
};