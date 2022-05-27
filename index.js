const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Welcome Root Route!!!")
})
// console.log(process.env)

const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.PROJECT_USERNAME}:${process.env.PROJECT_PASSWORD}@cluster0.ensig.mongodb.net/${process.env.PROJECT_DATABASENAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    // console.log(err)
    const channelsCollection = client.db("radioStations").collection("channels");
    console.log("Database Connected");

    // POST/CREATE A RADIO CHANNEL
    app.post('/channel', (req, res) => {
        const data = req.body
        // console.log(data)
        channelsCollection.insertOne(data)
            .then(result => {
                res.json("Succesfully Save New Station Please Reload App")
            })
    })

    // GET/READ ALL RADIO CHANNEL
    app.get('/channel', (req, res) => {
        channelsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    // GET/READ SINGLE RADIO CHANNEL
    app.get('/singleChannel/:id', (req, res) => {
        const id = req.params.id
        // console.log(id)
        channelsCollection.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })

    // UPDATE SPECIFIC RADIO CHANNEL
    app.patch('/update/:id', (req, res) => {
        const id = req.params.id;
        const data = req.body;
        // console.log(data);
        channelsCollection.updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: data.name,
                frequency: data.frequency
            }
        })
            .then(result => {
                res.json("Update station successfully. Reload App")
            })
    })

    // DELETE SPECIFIC RADIO CHANNEL
    app.delete('/channel/:id', (req, res) => {
        const id = req.params.id
        // console.log(id)
        channelsCollection.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.json("Radio channel delete successfully. Reload App")
            })
    })

})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
})