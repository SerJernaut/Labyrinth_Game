const mongoose = require('mongoose');
const {modelRefs} = require("./modelRefs");

const schema = {
    user: {  ...modelRefs.userRef,
        required: true
    },
    value:  {
        type: 'String',
        required: true,
    }
};


const refreshTokenSchema = mongoose.Schema(schema);
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;