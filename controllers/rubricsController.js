module.exports = function (rubrics, Validator, lodash) {
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

    var deleteOne = function(req, res) {
        rubrics.deleteOne(req.params.slug, function (err, rubricArticles) {
            if(err) {
                res.send(500, {error: err});
            } else {
                res.send(200, {rubricArticles});
            }
        });
    };

    function validateAddData(data, resolve) {
        let errors = {};
        if (data) {
            if (Validator.isEmpty(String(data.name))) {
                errors.name = 'Поле обязательно';
            }

            if (Validator.isEmpty(String(data.slug))) {
                errors.slug = 'Поле обязательно';
            }
        } else {
            errors.message = 'Пустые данные';
        }

        if (lodash.isEmpty(errors)) {
            rubrics.one(data.slug, function (err, rubric) {
                if(err) {
                    errors.message = err;
                } else if (!lodash.isUndefined(rubric)) {
                    errors.slug = 'Такой slug уже существует';
                }
                resolve({
                    errors,
                    isValid: lodash.isEmpty(errors)
                });
            });
        } else {
            resolve({
                errors,
                isValid: lodash.isEmpty(errors)
            });
        }
    }

    var add = function (req, res) {
        new Promise((resolve, reject) => {
            validateAddData(req.body, resolve);
        }).then(({errors, isValid}) => {
            if(!isValid) {
                res.send(400, {errors});
            } else {
                rubrics.add(req.body, function (err, article) {
                    if(err) {
                        res.send(500, {error: err});
                    } else {
                        res.send(200, { article });
                    }
                });
            }
        }).catch((error) => {
            console.log( error );
        });
    };

    function validateEditData(data, resolve) {
        let errors = {};

        if (data) {
            if (Validator.isEmpty(String(data.name))) {
                errors.name = 'Поле обязательно';
            }

            if (Validator.isEmpty(String(data.slug))) {
                errors.slug = 'Поле обязательно';
            }
        } else {
            errors.message = 'Пустые данные';
        }

        if (lodash.isEmpty(errors)) {
            rubrics.oneBy({name: data.name}, data.id, function (err, rubric) {
                if(err) {
                    errors.message = err;
                } else if (!lodash.isUndefined(rubric)) {
                    errors.name = 'Такое название уже существует';
                }

                rubrics.oneBy({slug: data.slug}, data.id, function (err, rubric) {
                    if(err) {
                        errors.message = err;
                    } else if (!lodash.isUndefined(rubric)) {
                        errors.slug = 'Такой slug уже существует';
                    }

                    resolve({
                        errors,
                        isValid: lodash.isEmpty(errors)
                    });
                });
            });
        } else {
            resolve({
                errors,
                isValid: lodash.isEmpty(errors)
            });
        }
    }

    var edit = function (req, res) {
        new Promise((resolve, reject) => {
            validateEditData(req.body, resolve);
        }).then(({errors, isValid}) => {
            if(!isValid) {
                res.send(400, {errors});
            } else {
                rubrics.edit(req.body, function (err, article) {
                    if(err) {
                        res.send(500, {error: err});
                    } else {
                        res.send(200, { article });
                    }
                });
            }
        }).catch((error) => {
            console.log( error );
        });
    };


    return {findAll, findOne, findArticles, add, deleteOne, edit};
};