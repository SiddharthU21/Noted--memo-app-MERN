// this is the entry point of our backend we have seperated the db cnoonect funcn in db.js  

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');






connectToMongo();

const app = express()
const port = process.env.PORT || 5000


//middleware for accessing our localhost from browser
app.use(cors())
//middleware for getting request from body (req.body)
app.use(express.json())

//Available Routes
//here we created routers folder for requests which we imported here in index
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}


app.listen(port, () => {
  console.log(`Noted-backend listening at http://localhost:${port}`)
})