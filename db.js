//here require is used just like import in but in node
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/noted?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongo = ()=>{
      mongoose.connect(mongoURI, ()=>{
          console.log('connected to mongoDB success');
      })
}

module.exports = connectToMongo;