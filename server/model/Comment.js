var mongoose = require('mongoose');
var shortid = require('shortid');;
var Schema = mongoose.Schema
let CommentSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  title:{
    type:String
  },
  url:{
    type:String
  },
  content:{
    type:String
  },
  username:{
    type:String
  },
  tid:{
    type:String
  },
})
module.exports = mongoose.model('Comment',CommentSchema)
