const mongoose = require('mongoose');

const schema = {
    user: {  type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'User'
    },
    value:  {
        type: 'String',
        required: true,
    }
};


const refreshTokenSchema = mongoose.Schema(schema);
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;