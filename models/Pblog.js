var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var pblog = new Schema({
  authorname: String,
  userid: String,
  pdate: String,
  readtime: String,
  ftopic: String,
  fcontent: String,
  image: String,
});
module.exports = mongoose.model('pblog', pblog);
