module.exports = (req, res) => {
    const {accessTokenValue, refreshTokenValue, refreshTokenPayload, user} = req;
    res.send({
        user: (({_id, nickName, ...rest})=> ({_id, nickName}))(user || refreshTokenPayload.user),
        tokenPair: {
            accessToken: accessTokenValue,
            refreshToken: refreshTokenValue,
        }
    });
};