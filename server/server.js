const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const cors = require("cors");
app.use(cors());

require('dotenv').config({path: './config/.env'})

connectDB()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )


app.use('/', mainRoutes)
 

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    