const mongoose = require('mongoose');
const User = require('./User');
const RefreshToken = require('./RefreshToken');
const Game = require('./Game');
const {BoardCell} = require('./BoardCell');
const {MONGODB_URL} = require('../constants')

mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = {
  User,
  RefreshToken,
  Game,
  BoardCell
}
