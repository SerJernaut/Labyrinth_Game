const userQueries = require('../queries/userQueries')
const socketController = require("../../app");

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


module.exports.setIsReadyFalseMW = async (req, res, next) => {
    try{
        const {authorizationData: {_id}} = req;
        const neededIsReadyStatus = false;
        await userQueries.updateUserByPredicate(_id, {$set: {isReady: neededIsReadyStatus}});
        next()
    }
    catch(e) {
        next(e);
    }
}

module.exports.setIsReadyFalseAndEmit = async (req, res, next) => {
    try{
        const {authorizationData: {_id}, body: {gameRoomId}} = req;
        console.log(gameRoomId)
        const neededIsReadyStatus = false;
        await userQueries.updateUserByPredicate(_id, {$set: {isReady: neededIsReadyStatus}});
        socketController.socketController.gameController.emitChangeReadyStatus(neededIsReadyStatus, gameRoomId, _id)
        res.end();
    }
    catch(e) {
        next(e);
    }
}

module.exports.setIsReadyTrueAndEmit = async (req, res, next) => {
    try{
        const {authorizationData: {_id}, body: {gameRoomId}} = req;
        const neededIsReadyStatus = true;
        await userQueries.updateUserByPredicate(_id, {$set: {isReady: neededIsReadyStatus}});
        socketController.socketController.gameController.emitChangeReadyStatus(neededIsReadyStatus, gameRoomId, _id)
        res.end()
    }
    catch(e) {
        next(e);
    }
}