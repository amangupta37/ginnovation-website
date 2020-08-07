var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var blog = new Schema({
username :String,
rollno :String,
topic :String,
content: String
});
module.exports = mongoose.model('blog', blog);