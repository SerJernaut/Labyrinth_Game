module.exports = (req, res) => {
    const {accessTokenValue, refreshTokenValue, user} = req;
    res.send({
        user: (({_id, nickName, ...rest})=> ({_id, nickName}))(user),
        tokenPair: {
            accessToken: accessTokenValue,
            refreshToken: refreshTokenValue,
        },
    });
};