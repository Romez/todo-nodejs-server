module.exports = function (articles, Validator, lodash) {
    var findAll = function(req, res) {
        articles.list(function (err, articles) {
            if(err){
                res.send(500, {error: err});
            } else {
                res.send(200, {articles});
            }
        })
    };

    var findOne = function(req, res) {
        articles.one(req.params.id, function (err, article) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {article});
            }
        });
    };

    var findBy = function(req, res) {
        articles.findBy(req.params.slug, function (err, article) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {article});
            }
        });
    };

    function validateData(data) {
        let errors = {};

        if (Validator.isEmpty(data.title)) {
            errors.title = 'Поле обязательно ';
        }

        if (Validator.isEmpty(data.body)) {
            errors.body = 'Поле обязательно ';
        }

        if (Validator.isEmpty(String(data.rubric))) {
            errors.rubric = 'Поле обязательно ';
        }

        if (Validator.isEmpty(String(data.createdAt))) {
            errors.createdAt = 'Поле обязательно ';
        }

        return {
            errors,
            isValid: lodash.isEmpty(errors)
        }
    }
    
    var add = function (req, res) {
        const {errors, isValid } = validateData(req.body);

        if(!isValid) {
            res.send(400, {errors});
        } else {
            articles.add(req.body, function (err, article) {
                if(err) {
                    res.send(500, {error: err});
                } else {
                    res.send(200, { article });
                }
            });
        }
    };

    var edit = function (req, res) {
        const {errors, isValid } = validateData(req.body);

        if(!isValid) {
            res.send(400, {errors});
        } else {
            articles.edit(req.body, function (err, article) {
                if(err) {
                    res.send(500, {error: err});
                } else {
                    res.send(200, { article });
                }
            });
        }
    };

    var deleteOne = function(req, res) {
        articles.deleteOne(req.params.id, function (err, rubricArticles) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {rubricArticles});
            }
        });
    };

    return {findAll, findOne, findBy, add, edit, deleteOne};
};