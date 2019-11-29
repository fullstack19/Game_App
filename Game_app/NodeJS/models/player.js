const mongoose = require('mongoose');

var Player = mongoose.model('Player', {
    player: {type: String},
    rank: {type: Number},
    score: {type: Number},
    time: {type: String},
    favourite_game: {type: String},
    status: {type: String}
});

module.exports = { Player };