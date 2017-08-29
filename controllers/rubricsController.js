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
        rubrics.one(req.params.slug, function (err, rubric) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {rubric});
            }
        });
    };

    var findArticles = function(req, res) {
        rubrics.getRubricArticles(req.params.slug, function (err, rubricArticles) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {rubricArticles});
            }
        });
    };

    return {findAll, findOne, findArticles};
};