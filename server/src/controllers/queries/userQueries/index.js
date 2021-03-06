const {User} = require('../../../models/index');
const { ApplicationError } = require('../../../utils/errors');
const bcrypt = require('bcrypt');

module.exports.createUserByPredicate = async predicate => {
    const createdUser = await User.create(predicate);
    if (createdUser) {
        return createdUser.toObject();
    }
    throw new ApplicationError('can not create refresh token');
}

module.exports.findUserByPredicate = async predicate => {
    const foundUser = await User.findOne(predicate);
    if (foundUser) {
        return foundUser.toObject();
    }
    throw new ApplicationError('no user with such data');
}

module.exports.passwordCompare = async (pass1, pass2) => {
    const passwordCompare = await bcrypt.compare(pass1, pass2);
    if ( !passwordCompare) {
        throw new ApplicationError('Wrong password');
    }
};

module.exports.updateUserByPredicate = async (findParam, updateParam) => {
    const updatedUser = await User.findByIdAndUpdate(findParam, updateParam, {new: true}).lean();
    if (!updatedUser) {
        throw new ApplicationError('can not update the user')
    }

}