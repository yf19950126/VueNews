// 用户收藏文章表
var mongoose = require('mongoose');
var shortid = require('shortid');;
var Schema = mongoose.Schema
let EssaySchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  title:{
    type:String
  },
  tid:{
    type:String
  },
  url:{
    type:String
  },
  username:{
    type:String
  }
})
module.exports = mongoose.model('Essay',EssaySchema)
