var mongoose = require('mongoose');
var shortid = require('shortid');;
var Schema = mongoose.Schema
let ArticleSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  username:{
    type:String
  }
})
module.exports = mongoose.model('Article',ArticleSchema)
