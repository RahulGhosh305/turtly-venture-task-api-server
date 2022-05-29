const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
require('dotenv').config()

// Routes files
const channelRoute = require('./routes/channelRoute')
const registrationRoute = require('./routes/userRegistrationRoute')

// DB Connect
const uri = `mongodb+srv://${process.env.PROJECT_USERNAME}:${process.env.PROJECT_PASSWORD}@cluster0.ensig.mongodb.net/${process.env.PROJECT_DATABASENAME}?retryWrites=true&w=majority`;
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database Connected');
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/channel', channelRoute)
app.use('/auth', registrationRoute)


app.get('/', (req, res) => {
    res.send('Server Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Running Server")
})

