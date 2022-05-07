//a normal mongoose model of a user just like a database datatype
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
      name : {
          type : String,
          required : true,
      },
      email : {
          type : String,
          required : true,
          unique : true
      },
      password : {
          type : String,
          required : true,
      },
      date : {
          type : Date,
          default : Date.now
      },   
});
const User = mongoose.model('user', UserSchema);

module.exports = User

// here the parameters are the name of the schema and the schema itself
