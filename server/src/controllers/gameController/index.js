const gameQueries = require('../queries/gameQueries')

module.exports.createPreparingGameDataAndSend = async (req, res, next) => {
    try {
        const {authorizationData: {_id}, body} = req;
        const preparingGameData = await gameQueries.createPreparingGameDataByPredicate({owner: _id, ...body});
        res.send ({
            preparingGameData
        })
    } catch (e) {
        next(e);
    }
};