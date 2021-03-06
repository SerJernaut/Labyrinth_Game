const mongoose = require('mongoose');
const {modelRefs} = require("./modelRefs");

const schema = {
    user: {  ...modelRefs.userRef,
        required: true
    },
    value:  {
        type: mongoose.Schema.Types.String,
        required: true,
    }
};


const refreshTokenSchema = mongoose.Schema(schema, { versionKey: false });
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;