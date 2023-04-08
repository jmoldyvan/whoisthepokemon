import express from 'express'
import  mongoose  from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
import  connectDB  from './config/database.js'
import mainRoutes from './routes/main.js'
import cors from "cors"
import { VerifyToken } from './middleware/VerifyToken.js'
// import dotenv from "dotenv";
const app = express()
app.use(cors());



// dotenv.config({path: './config/database'})

connectDB()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(VerifyToken);
// Sessions-
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