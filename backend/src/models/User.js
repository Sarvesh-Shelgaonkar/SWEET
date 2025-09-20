const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const user_Schema=new mongoose.Schema({
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    name:{ type: String },
    isAdminRole:{ type:Boolean, default:false },
},{ timestamps:true });


user_Schema.methods.comparePassword = function(pass) {
    return bcrypt.compare(pass, this.password);
  };
user_Schema.statics.hashPassword = function(pass) {
    return bcrypt.hash(pass, 10);
  };
  
  module.exports = mongoose.model('User', user_Schema);