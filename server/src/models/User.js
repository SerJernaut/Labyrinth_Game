const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {NICKNAME_PATTERN} = require("../constants");
const Schema = mongoose.Schema;

const userSchema = new Schema({

  nickName: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    match: NICKNAME_PATTERN,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  }
});

userSchema.pre('save', function hashPassword (next) {

  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});


userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
