const {Schema} = require('mongoose');

module.exports.modelRefs = {
    userRef:  {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}