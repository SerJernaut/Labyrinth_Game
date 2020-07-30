const {ApplicationError} = require("../../utils/errors");
module.exports = (req, res, next) => {
    const {authorizationData: {_id}, foundedGameRoomData} = req;
    if (_id == foundedGameRoomData.owner._id) {
        return next();
    }
    next(new ApplicationError('Only for game room owner'));
}