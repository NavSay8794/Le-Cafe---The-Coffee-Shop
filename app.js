const express = require('express')
const app = express()
//adding environment configuration
const env = require('dotenv')
env.config()
//adding mongoose connection
const mongoose = require('mongoose')
//adding Session having mongo connect
const session = require('express-session')
const MongoStore = require('connect-mongo')
mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.w3v7g.mongodb.net/${process.env.MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(session({
    secret: 'SeCrEt',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({mongooseConnection: mongoose.connection}),
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.w3v7g.mongodb.net/${process.env.MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`
    }) ,
    cookie:{
        maxAge: 180*60*1000
    }
}))

// products route
const productsRoute = require('./routes/productsAPI')
const ordersRoute = require('./routes/ordersAPI')
const cartRoute = require('./routes/cartAPI')
const comboRoute = require('./routes/combosAPI')
const postOrderRoute = require('./routes/postOrderAPI')

app.use(express.json())
app.use(express.urlencoded({extended:'false'}))


// Using routes
app.use('/',productsRoute)
app.use('/', cartRoute)
app.use('/',ordersRoute)
app.use('/',comboRoute)
app.use('/', postOrderRoute)


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Connected at port ${process.env.PORT}`)
})