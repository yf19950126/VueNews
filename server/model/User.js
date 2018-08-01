// 用户注册信息表
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  username:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  age:{
    type:String,
    require:true
  },
  pass:{
    type:String
  }
})
module.exports = mongoose.model('User',UserSchema)
