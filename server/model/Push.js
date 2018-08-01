// 用户发表文章表
var mongoose = require('mongoose');
var shortid = require('shortid');;
var Schema = mongoose.Schema
let PushSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  title:{
    type:String
  },
  author:{
    type:String
  },
  content:{
    type:String
  },
  img:{
    type:String
  }
})
module.exports = mongoose.model('Push',PushSchema)
