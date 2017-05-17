var mongoose = require('mongoose');

var RqwertySchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Rqwerty', RqwertySchema);
