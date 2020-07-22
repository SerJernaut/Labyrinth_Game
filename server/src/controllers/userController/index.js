const userQueries = require('../queries/userQueries')

module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        req.user = await userQueries.createUserByPredicate({...body});
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.findUserByNickName = async (req, res, next) => {
    try {
        const {body: {nickName}} = req;
        req.user = await userQueries.findUserByPredicate({nickName});
        next();
    } catch (e) {
        next(e);
    }
};

module.exports.checkIsPasswordRight = async (req, res, next) => {
    try {
        const {body, user: {password}} = req;
        await userQueries.passwordCompare(body.password, password);
        next();
    } catch (e) {
        next(e);
    }
}