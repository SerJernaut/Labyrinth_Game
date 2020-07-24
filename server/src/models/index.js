const mongoose = require('mongoose');
const User = require('./User');
const RefreshToken = require('./RefreshToken');
const Game = require('./Game');
const {BoardCell} = require('./BoardCell');

mongoose.connect('mongodb://localhost:27017/labyrinth_db', {
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
