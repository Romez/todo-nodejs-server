module.exports = function (chat) {

    var getHistory = function(req, res) {
        chat.getHistory(function (err, messages) {
            res.send(200, {messages: messages});
        });
    };

    return {
        getHistory: getHistory
    };
};