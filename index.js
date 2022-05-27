// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// require('dotenv').config()
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');

// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // console.log(process.env)

// const ObjectId = require('mongodb').ObjectId;
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.PROJECT_USERNAME}:${process.env.PROJECT_PASSWORD}@cluster0.ensig.mongodb.net/${process.env.PROJECT_DATABASENAME}?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     // console.log(err)
//     const channelsCollection = client.db("radioStations").collection("channels");
//     const registrationCollection = client.db("radioStations").collection("userRegistration");
//     console.log("Database Connected");

//     // POST USER INFO FOR REGISTRATION
//     app.post('/registration', (req, res) => {
//         const formData = req.body
//         // Store password hash in your DB.
//         bcrypt.hash(formData.password, saltRounds, function (err, hash) {
//             const userData = {
//                 email: formData.email,
//                 password: hash
//             }
//             registrationCollection.insertOne(userData)
//                 .then(result => {
//                     res.json('Succesfully Registration')
//                 })
//         });
//     })

//     //GET USER INFO FOR LOGIN
//     app.post('/login', (req, res) => {
//         const { email, password } = req.body

//         registrationCollection.find({ email })
//             .toArray((err, documents) => {
//                 if (documents) {
//                     // Load hash from your password DB.
//                     bcrypt.compare(password, documents[0].password, function (err, result) {
//                         if (err) {
//                             res.json("Error In Occoured")
//                         }
//                         else if (result) {
//                             //Login Succesfully
//                             let token = jwt.sign({ email: documents[0], email, id: documents[0]._id }, 'SECRET', { expiresIn: '2h' });
//                             // documents[0]
//                             res.send(token)
//                         }
//                         else {
//                             res.json("Login Failed")
//                         }
//                     });
//                 }
//             })
//     })

//     // POST/CREATE A RADIO CHANNEL
//     app.post('/channel', (req, res) => {
//         const data = req.body
//         // console.log(data)
//         channelsCollection.insertOne(data)
//             .then(result => {
//                 res.json("Succesfully Save New Station Please Reload App")
//             })
//     })

//     // GET/READ ALL RADIO CHANNEL
//     app.get('/channel', (req, res) => {
//         channelsCollection.find({})
//             .toArray((err, documents) => {
//                 res.send(documents)
//             })
//     })

//     // GET/READ SINGLE RADIO CHANNEL
//     app.get('/singleChannel/:id', (req, res) => {
//         const id = req.params.id
//         // console.log(id)
//         channelsCollection.find({ _id: ObjectId(id) })
//             .toArray((err, documents) => {
//                 res.send(documents[0])
//             })
//     })

//     // UPDATE SPECIFIC RADIO CHANNEL
//     app.patch('/update/:id', (req, res) => {
//         const id = req.params.id;
//         const data = req.body;
//         // console.log(data);
//         channelsCollection.updateOne({ _id: ObjectId(id) }, {
//             $set: {
//                 name: data.name,
//                 frequency: data.frequency
//             }
//         })
//             .then(result => {
//                 res.json("Update station successfully. Reload App")
//             })
//     })

//     // DELETE SPECIFIC RADIO CHANNEL
//     app.delete('/channel/:id', (req, res) => {
//         const id = req.params.id
//         // console.log(id)
//         channelsCollection.deleteOne({ _id: ObjectId(id) })
//             .then(result => {
//                 res.json("Radio channel delete successfully. Reload App")
//             })
//     })

// })

// app.get('/', (req, res) => {
//     res.send("Welcome Root Route!!!")
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//     console.log(`Port is running on ${PORT}`)
// })



// ##################################################################################################
// ##################################################################################################
// ##################################################################################################
// ##################################################################################################
// ##################################################################################################


const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
require('dotenv').config()

// Routes files
const channelRoute = require('./routes/channel')

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


app.get('/', (req, res) => {
    res.send('Server Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Running Server")
})

