const mongoose = require('mongoose');

const Robot = mongoose.model('Robot', { name: String });

module.exports = Robot;